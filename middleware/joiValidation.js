const { registerValidation, login } = require("../Joi_validation/joiSchema");
const ExpressError = require("../utils/ExpressError");

module.exports.validRegister = (req, res, next) => {
  const { error } = registerValidation.validate(req.body, {
    abortEarly: false,
  });

  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 404);
  } else {
    next();
  }
};

module.exports.validLogin = (req, res, next) => {
  const { error } = login.validate(req.body, { abortEarly: false });
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 404);
  } else {
    next();
  }
};

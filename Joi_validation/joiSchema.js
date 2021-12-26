const Joi = require("Joi");

module.exports.registerValidation = Joi.object({
  username: Joi.string().min(4).max(10).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(15).required(),
  comfirmPassword: Joi.string().required().valid(Joi.ref("password")),
});


module.exports.login = Joi.object({
    username:Joi.string().required(),
    password:Joi.string().required()
})


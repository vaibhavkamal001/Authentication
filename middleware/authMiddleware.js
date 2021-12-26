module.exports.isLogIn = (req, res, next) => {
  if (!req.session.userId) {
    return res.json({ message: "you must login first" });
  } else {
    next();
  }
};

module.exports.guest = (req, res, next) => {
  if (req.session.userId) {
    return res.json({ message: "you are already loggedIn" });
  }
  next();
};

module.exports.LogIn = (req, Id) => {
  req.session.userId = Id;
};

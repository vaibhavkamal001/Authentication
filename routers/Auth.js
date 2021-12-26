const express = require("express");
const { isLogIn, LogIn, guest } = require("../middleware/authMiddleware");
const { validLogin } = require("../middleware/joiValidation");
const User = require("../models/user");
const catchAsync = require("../utils/catchError");
const ExpressError = require("../utils/ExpressError");

const { SESS_NAME = "sid" } = process.env;

const router = express.Router();

router.post(
  "/login",
  guest,
  validLogin,
  catchAsync(async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await user.matchPassword(password))) {
      throw new ExpressError("invalid email or password", 404);
    }

    LogIn(req, user._id);

    res.json({ message: "You are loggedIn now" });
  })
);

router.post(
  "/logout",
  isLogIn,
  catchAsync(async (req, res) => {
    await req.session.destroy();
    res.clearCookie(SESS_NAME);
    res.json({ message: "You LogOut" });
  })
);

module.exports = router;

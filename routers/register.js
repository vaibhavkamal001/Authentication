const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { validRegister } = require("../middleware/joiValidation");
const catchAsync = require("../utils/catchError");
const ExpressError = require("../utils/ExpressError");
const {guest,LogIn} = require("../middleware/authMiddleware")

router.post(
  "/register",
  guest,
  validRegister,
  catchAsync(async (req, res) => {
    const { email, username, password } = req.body;
    const found = await User.exists({ email });

    if (found) {
      throw new ExpressError("invalid Email", 404);
    }

    const user = new User({
      username,
      email,
      password,
    });

    LogIn(req,user._id)

    await user.save();

    res.json({ message: "ok" });
  })
);

module.exports = router;

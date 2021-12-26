const express = require("express");
const { isLogIn } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/home", isLogIn, (req, res) => {
  res.json({ message: "hi!!", discription: "my name is vaibhav." });
});

module.exports = router;

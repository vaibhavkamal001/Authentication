const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

const {sessionConfig} = require("./session/session");
const ExpressError = require("./utils/ExpressError");

const home = require("./routers/home")
const Auth = require("./routers/Auth");
const register = require("./routers/register");


const { dbURL = "mongodb://localhost:27017/authDB_test2" } = process.env;

mongoose
  .connect(dbURL)
  .then(console.log("Database connected"))
  .catch((e) => console.log(e));

app.use(express.urlencoded({ extended: true }));

app.use(session(sessionConfig));

app.use("/", home);
app.use("/", Auth);
app.use("/", register);

app.all("*", (req, res, next) => {
  next(new ExpressError("page not found", 404));
});

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) {
    err.message = "somethig went worng";
  }
  res.status(statusCode).json(err.message);
});

const {PORT = 3000} = process.env;

app.listen(PORT,()=>{
    console.log(`servering port ${PORT}`);
})

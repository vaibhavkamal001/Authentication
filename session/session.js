const mongoDBstore = require("connect-mongo");

const oneMin = 1000*60;
const oneHours = oneMin*60;
const oneDay = oneHours*24

const {
  dbURL = "mongodb://localhost:27017/authDB_test2",
  SESS_NAME = "sid",
  SESS_SECRECT = "THISISBADSECREC",
  SESS_TIMEOUT = oneDay,
  SESS_STORE_SECRECT = "THISISBADSECRECT",
  IN_PROD="develpoment",
} = process.env;

const sessionStore = mongoDBstore.create({
  mongoUrl: dbURL,
  secret: SESS_STORE_SECRECT,
  touchAfter:oneDay,
});

module.exports.sessionConfig = {
  secret: SESS_SECRECT,
  name: SESS_NAME,
  store: sessionStore,
  cookie: {
    maxAge: +SESS_TIMEOUT,
    httpOnly: true,
    secureed: IN_PROD === "production",
    sameSite: true,
  },
  rolling: true,
  resave: false,
  saveUninitialized: true,
};

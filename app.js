const express = require("express");
const app = express();

const passport = require("passport");
const { db } = require("./config/index");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const createApp = () => {
  db.authenticate()
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
  app.use(helmet());
  app.use(cors());
  app.use(passport.initialize());
  app.use(bodyParser.json());

  require("./routes/main.routes")(app);

  return app;
};

module.exports = { createApp };

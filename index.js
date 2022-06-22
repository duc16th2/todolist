const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
var passport = require("passport");
require("./config/passport")(passport);
require("./config/db")(mongoose);
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/todos", require("./router/todo.router"));
app.use("", require("./router/auth.router"));
const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));

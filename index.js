const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
mongoose
  .connect("mongodb://localhost:27017/todos")
  .then(() => {
    console.log("success");
  })
  .catch(() => {
    console.log("fail");
  });
app.get("/", function (req, res) {
  res.render("pages/auth");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));

var passport = require("passport");
const todosModel = require("./model/todos.model");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/success", async (req, res) => {
  const allTodos = await todosModel.find();
  res.render("pages/success", { user: userProfile, todos: allTodos });
});

app.post("/success/add/todo", async function (req, res) {
  const todo = req.body;
  await todosModel.create({ todo: todo.todo, status: "not-done" });
  res.redirect("/success");
});
app.get("/delete/todos/:_id", async (req, res) => {
  const { _id } = req.params;
  await todosModel.deleteOne({ _id });
  res.redirect("/success");
});
app.get("/logout", async (req, res) => {
  res.redirect("/");
});

app.get("/todos/todo/done/:_id", async (req, res) => {
  const { _id } = req.params;
  await todosModel.updateOne({ _id }, { status: "done" });
  res.redirect("/success");
});
app.get("/error", (req, res) => res.send("error logging in"));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID =
  "995936862788-gfaalaibpifi7jieira420bfeiplh9ju.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  function (req, res) {
    // Successful authentication, redirect success.
    res.redirect("/success");
  }
);

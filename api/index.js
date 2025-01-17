const express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
const passport = require("passport");
const passportLocal = require("./passportLocal");
const User = require("./db/models/users.js");
passportLocal(passport, User.getUserByEmail, User.getUserById);
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/user", (req, res) => {
  console.log({ user: req.user });
  res.json({ user: req.user });
});
app.post("/login", passport.authenticate("local"), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json({ user: req.user });
});
app.post("/register", checkNotAuthenticated, async (req, res) => {
  let { username, email, password } = req.body;
  try {
    user = await User.save({ username, email, password });
    passport.authenticate("local")(req, res, function() {
      res.json({ user: req.user });
    });
  } catch (e) {
    console.log(e);
    res.redirect("/register");
  }
});
app.delete("/logout", (req, res) => {
  req.logOut();
  res.sendStatus(204);
  // res.redirect("/login");
});
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }
  next();
}
var products = require("./routes/products.js");

app.use("/products", products);

module.exports = {
  path: "/api",
  handler: app
};

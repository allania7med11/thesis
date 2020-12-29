const express = require("express");
var cookieParser = require("cookie-parser");
const app = express();

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

var products = require("./routes/products.js");

app.use("/products", products);

module.exports = {
  path: "/api",
  handler: app
};

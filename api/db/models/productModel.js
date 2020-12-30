var mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: String,
  price: Number,
  description: String
});

const Modelproduct = mongoose.model("product", productSchema);

module.exports.Modelproduct = Modelproduct;

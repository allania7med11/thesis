var { Modelproduct } = require("../models/productModel");

module.exports = {
  create: (obj, callbacks) => {
    const product = new Modelproduct(obj);
    product.save(callbacks);
  },
  read: (callbacks) => {
    Modelproduct.find().exec(callbacks);
  },
  update: (id, obj, callback) => {
    Modelproduct.findOneAndUpdate(
      { _id: id },
      obj,
      callback
    );
  },
  delete: (id, callback) => {
    Modelproduct.findByIdAndRemove({ _id: id }).exec(callback);
  },
};

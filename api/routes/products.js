var express = require("express");
var productControle = require("../db/controllers/productControle.js");

var router = express.Router();

router.route("/").post(function (req, res) {
  productControle.create(req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/").get(function (req, res) {
  productControle.read((err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});

router.route("/:id").put(function (req, res) {
  console.log(req.body);
  productControle.update(req.params.id,req.body, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
router.route("/:id").delete((req, res) => {
  console.log(req.params.id);
  productControle.delete(req.params.id, (err, data) => {
    if (err) {
      throw err;
    }
    res.send(data);
  });
});
module.exports = router;

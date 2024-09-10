const productModel = require("../models/product_schema");

const productController = {
  // product get api
  getProduct: async (req, res, next) => {
    productModel.find({}, (err, data) => {
      if (err) {
        console.log(`err : ${err}`);
        res.json({
          message: `err : ${err}`,
        });
        throw err;
      } else {
        res.json(data);
        console.log("data running");
      }
    });
  },

  postProduct: async (req, res) => {
    console.log("body", req.body);
    productModel.create(req.body, (error, data) => {
      if (error) {
        // res.send("error", error);
        res.json({
          message: "products error.",
        });
      } else {
        res.json({
          message: "product added successfully.",
          data,
        });
      }
    });
  },
};

module.exports = productController;

const mongoose = require("mongoose");

const plantifyProductSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

const plantifyProductModel = mongoose.model(
  "plantify_products",
  plantifyProductSchema
);
module.exports = plantifyProductModel;

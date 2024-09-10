const mongoose = require("mongoose");

const favouritesSchema = mongoose.Schema({
  userUid: {
    type: String,
    required: true,
  },

  product: {
    type: Object,
    required: true,
  },

  // title: {
  //   type: String,
  //   required: true,
  // },
  // price: {
  //   type: String,
  //   required: true,
  // },
});

const favouritesModel = mongoose.model("plantify_favourites", favouritesSchema);
module.exports = favouritesModel;

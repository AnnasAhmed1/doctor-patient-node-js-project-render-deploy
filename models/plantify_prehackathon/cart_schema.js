const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({

  userUid:{
    type:String,
    required:true
  },

 product: {
  type: Object,
    required: true,
 }
//  title: {
//     type: String,
//     required: true,
  
//   },
//   price: {
//     type: String,
//     required: true,
//   },
});

const cartModel = mongoose.model("plantify_cart", cartSchema);
module.exports = cartModel;

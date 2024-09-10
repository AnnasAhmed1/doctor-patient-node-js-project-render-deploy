const mongoose = require("mongoose");
const billSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      required: true,
    },
    // userId: {
    //   type: String,
    //   required: true,
    // },
    // doctorId: {
    //   type: String,
    //   required: true,
    // },
    // doctorInfo: {
    //   type: Object,
    //   required: true,
    // },
    // userInfo: {
    //   type: Object,
    //   required: true,
    // },
    // date: {
    //   type: String,
    //   required: true,
    // },
    // time: {
    //   type: String,
    //   required: true,
    // },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const billModel = mongoose.model("bill", billSchema);
module.exports = billModel;

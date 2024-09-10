const express = require("express");
const router = express.Router();
const Bill = require("../models/billModel");
const authMiddleware = require("../middlewares/authMiddleware");
// const Appointment = require("../models/appointmentModel");
const User = require("../models/userModel");

// router.post("/register", async (req, res) => {
//   try {
//     const userExists = await Doctor.findOne({ email: req.body.email });
//     if (userExists) {
//       return res
//         .status(200)
//         .send({ message: "Doctor already exists", success: false });
//     }
//     // const password = req.body.password;
//     // const salt = await bcrypt.genSalt(10);
//     // const hashedPassword = await bcrypt.hash(password, salt);
//     // req.body.password = hashedPassword;
//     const newuser = new Doctor(req.body);
//     await newuser.save();
//     res
//       .status(200)
//       .send({ message: "Dcotor created successfully", success: true });
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ message: "Error creating doctor", success: false, error });
//   }
// });
// router.post("/login", async (req, res) => {
//   try {
//     const user = await Doctor.findOne({ email: req.body.email });
//     if (!user) {
//       return res
//         .status(200)
//         .send({ message: "Doctor does not exist", success: false });
//     }
//     const isMatch = user.password == req.body.password;
//     if (!isMatch) {
//       return res
//         .status(200)
//         .send({ message: "Password is incorrect", success: false });
//     } else {
//       res
//         .status(200)
//         .send({ message: "Login successful", success: true, data: user });
//     }
//   } catch (error) {
//     console.log(error);
//     res
//       .status(500)
//       .send({ message: "Error logging in", success: false, error });
//   }
// });

router.post("/generate-bill", async (req, res) => {
  // appointmnetId and amount in body
  try {
    req.body.status = "pending";
    // req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    // req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newBill = new Bill(req.body);
    await newBill.save();
    //pushing notification to doctor based on his userid
    // const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    // // user.unseenNotifications.push({
    // //   type: "new-appointment-request",
    // //   message: `A new appointment request has been made by ${req.body.userInfo.name}`,
    // //   onClickPath: "/doctor/appointments",
    // // });
    // await user.save();
    res.status(200).send({
      message: "bill generated successfully successfully",
      success: true,
      data: newBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error generating bill",
      success: false,
      error,
    });
  }
});

router.post("/get-bill-by-appointment-id", async (req, res) => {
  try {
    const bill = await Bill.findOne({ appointmentId: req.body.appointmentId });
    res.status(200).send({
      success: true,
      message: "Bill info fetched successfully",
      data: bill,
    });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting bill info", success: false, error });
  }
});

// router.post("/update-doctor-profile", authMiddleware, async (req, res) => {
//   try {
//     const doctor = await Doctor.findOneAndUpdate(
//       { userId: req.body.userId },
//       req.body
//     );
//     res.status(200).send({
//       success: true,
//       message: "Doctor profile updated successfully",
//       data: doctor,
//     });
//   } catch (error) {
//     res
//       .status(500)
//       .send({ message: "Error getting doctor info", success: false, error });
//   }
// });

// router.post("/get-appointments-by-doctor-id", async (req, res) => {
//   try {
//     // const doctor = await Doctor.findOne({ userId: req.body.userId });
//     const appointments = await Appointment.find({
//       doctorId: req.body.doctorId,
//     });
//     res.status(200).send({
//       message: "Appointments fetched successfully",
//       success: true,
//       data: appointments,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       message: "Error fetching appointments",
//       success: false,
//       error,
//     });
//   }
// });

router.post("/change-appointment-status", async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    console.log(appointmentId, status);
    const appointment = await Bill.findByIdAndUpdate(appointmentId, {
      status,
    });
    const newBill = await Appointment.findOne({ _id: appointmentId });

    // const user = await User.findOne({ _id: appointment.userId });
    // const unseenNotifications = user.unseenNotifications;
    // unseenNotifications.push({
    //   type: "appointment-status-changed",
    //   message: `Your appointment status has been ${status}`,
    //   onClickPath: "/appointments",
    // });

    // await user.save();

    res.status(200).send({
      message: "Bill status updated successfully",
      success: true,
      data: newBill,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error changing bill status",
      success: false,
      error,
    });
  }
});

module.exports = router;

const bcrypt = require("bcryptjs");
const userModel = require("../models/user_schema");
const jwt = require("jsonwebtoken");

const authController = {
  signup: async (req, res) => {
    const { firstName, lastName, email, password, contactNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !contactNumber) {
      res.json({ message: "required feilds not filled" });
      return;
    }
    if (password.length < 8) {
      res.json({ message: "password should nto be less than 8 characters" });
      return;
    }

    async function hashPassword(password) {
      return bcrypt.hash(password, 10);
    }
    // const hashedPassword = hashPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword, "hashedPassword");

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email,
      password: hashedPassword,
      contact_number: contactNumber,
    };

    userModel.findOne({ email }, (err, user) => {
      if (err) {
        console.log("error occured in find one", err);
        res.json({
          message: "error occured in find one",
          err,
        });
      } else {
        if (user) {
          res.json({
            message: "email already in use",
          });
        } else {
          userModel.create(userData, (err, data) => {
            if (err) {
              res.json({
                message: "error occured in creating user",
                err,
              });
            } else {
              res.json({
                message: "user created successfully",
                data: userData,
                status: true,
              });
            }
          });
        }
      }
    });
  },
  login: async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Required fields are missing!" });
      return;
    }

    userModel.findOne({ email }, async (err, user) => {
      if (err) {
        console.log(err, "error");
        res.status(500).json({
          message: "SomeThing Went Wrong!",
        });
      } else {
        if (user) {
          const isPasswordMatch = await bcrypt.compare(password, user.password);
          console.log(isPasswordMatch, "isPasswordMatch");
          if (isPasswordMatch) {
            const tokenObj = {
              ...user,
            };
            const token = jwt.sign(tokenObj, "helloworld");
            console.log(token, "token");
            res.status(200).json({
              message: "user successfully login",
              data: user,
              status: true,
              token,
            });
          } else {
            res.status(400).json({
              message: "credential error!",
            });
          }
        } else {
          res.status(400).json({
            message: "credential error!",
          });
        }
      }
    });
  },
};

module.exports = authController;

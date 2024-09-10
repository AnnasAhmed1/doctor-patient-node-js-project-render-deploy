const jwt = require("jsonwebtoken");

const middlewares = {
  authMiddleware: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const isValid = jwt.verify(token, "helloworld");

      if (isValid) {
        next();
        res.json({ message: "valid user" });
      } else {
        res.json({ message: "Invalid user else" });
      }
    } catch (error) {
      res.status(400).json({ message: "Invalid user catch" });
    }
  },
};

module.exports = middlewares;

const express = require("express");
const authControllers = require("../controllers/auth_controller");
const plantifyProductController = require("../controllers/plantify_prehackathon/plantify_product_controller");
const productController = require("../controllers/product_controller");
const middlewares = require("../middlewares/authMiddleware");
const router = express.Router();

// sample
router.get("/sample", (req, res) => {
  const headers = req.headers;
  console.log(headers.authorization, "headers");
  res.json({
    message: "SAMPLE",
  });
});

// auth
router.post("/signup", authControllers.signup);
router.post("/login", authControllers.login);

// product
router.post("/newproduct", productController.postProduct);
router.get("/products", productController.getProduct);

// plantify product

// product
router.post("/plantifynewproduct", plantifyProductController.postProduct);
router.get("/plantifyproducts", plantifyProductController.getProduct);
// cart
router.post("/addtocart", plantifyProductController.postCartProduct);
router.get("/getcartproducts:uid", plantifyProductController.getCartProduct);
// favourites
router.post(
  "/addtofavourites",
  plantifyProductController.postFavouritesProduct
);
router.get(
  "/getfavouritesproducts:uid",
  plantifyProductController.getFavouritesProduct
);

// post
router.post("/post", middlewares.authMiddleware, (req, res) => {
  res.json({
    message: "create post",
  });
});

module.exports = router;

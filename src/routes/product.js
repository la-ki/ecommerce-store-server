const express = require("express");
const { requireSignin, adminMiddleware } = require("../middlewares");
const { createProduct } = require("../controller/product");
const multer = require("multer");
const shortid = require("shortid");
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), 'uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/product/createProduct",
  requireSignin,
  adminMiddleware,
  upload.array("productPicture"),
  createProduct
);
 // router.get("/product/getAllProducts", getAllProducts);

module.exports = router;

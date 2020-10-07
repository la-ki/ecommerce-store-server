const express = require('express');
const {requireSignin, adminMiddleware} = require('../middlewares')
const {createCategory, getAllCategories} = require('../controller/category');
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

router.post('/category/createCategory',requireSignin,adminMiddleware, upload.single("categoryImage"), createCategory);
router.get('/category/getAllCategories', getAllCategories);

module.exports = router;
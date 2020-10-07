const express = require('express');
const {requireSignin, userMiddleware} = require('../middlewares')
const {addItemToCart} = require('../controller/cart');
const router = express.Router();

router.post('/user/cart/addtocart',requireSignin,userMiddleware, addItemToCart);

module.exports = router;
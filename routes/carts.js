const express = require('express');
const Cart = require('../models/carts');
const Product = require('../models/products');
const Category = require('../models/categories');
const User = require('../models/users');
const auth = require('../auth');
const router = express.Router();
router.route('/cart')




//route post by logged in users
router.post('/cart', auth.verifyUser, (req, res, next) => {
    let cart = new Cart(req.body);
    cart.user = req.user._id;
    cart.product = req.body.product;
    cart.save()
    .then((cart) => {
        res.statusCode = 200;
        res.json(cart);
    }).catch(next);
});


router.get('/cart', (req,res,next)=>{
    Cart.find({})
    .populate('user')
    .populate(
    'product')
    .then((order) => {
        res.json(order);
    }).catch((err) => next(err));

});

router.get('/userCarts', auth.verifyUser, (req, res, next) => {
    Cart.find({user:req.user._id})
    .populate('product')
    .populate('user')
    .then((order) => {
        res.json(order);
    }).catch((err) => next(err));
});





module.exports = router;
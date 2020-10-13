const express = require('express');
const Order = require('../models/orders');
const Product = require('../models/products');
const Category = require('../models/categories');
const User = require('../models/users');
const auth = require('../auth');
const router = express.Router();
router.route('/order')




//route post by logged in users
router.post('/order', auth.verifyUser, (req, res, next) => {
    let order = new Order(req.body);
    order.user = req.user._id;
    order.product = req.body.product;
    order.save()
    .then((order) => {
        res.statusCode = 200;
        res.json(order);
    }).catch(next);
});

// router.get('/order', (req,res,next)=>{
//     Order.find({})
//     .populate('user')
//     .populate({
//         path: 'product',
//         populate: {
//             path: '_category',
//             model: 'Category',
//         },
//     })
//     .then((order) => {
//         res.json(order);
//     }).catch((err) => next(err));

// });


router.get('/order', (req,res,next)=>{
    Order.find({})
    .populate('user')
    .populate(
    'product')
    .then((order) => {
        res.json(order);
    }).catch((err) => next(err));

});

router.get('/userOrders', auth.verifyUser, (req, res, next) => {
    Order.find({user:req.user._id})
    .populate('product')
    .populate('user')
    .then((order) => {
        res.json(order);
    }).catch((err) => next(err));
});





module.exports = router;
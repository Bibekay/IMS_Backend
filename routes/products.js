const express = require('express');
const Product = require('../models/products');
const Category = require('../models/categories');
const auth = require('../auth');
const router = express.Router();
router.route('/product')


router.route('/product', auth.verifyUser)
.post((req,res,next) => {
    let product = new Product(req.body);
    product.category = req.body.category;
    product.product_name = req.body.product_name;
    product.description = req.body.description;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.product_image = req.body.product_image;
    product.save()
    .then((product) => {
        res.statusCode = 200;
        res.json(product);
    }).catch(next);
});

router.get('/product', (req,res,next)=>{
    Product.find({})
    .populate('category')
    .then((product) => {
        res.json(product);
    }).catch((err) => next(err));


});


module.exports = router;
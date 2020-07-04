const express = require('express');
const Product = require('../models/products');
const auth = require('../auth');
const router = express.Router();
router.route('/product')


.post((req,res,next) => {
    let product = new Product(req.body);
    //product.category = req.Category._id;
    product.product_name = req.body.product_name;
    product.product_image = req.body.product_image;
    product.description = req.body.description;
    product.quantity = req.body.quantity;
    product.price = req.body.price;
    product.save()
    .then((product) => {
        res.statusCode = 201;
        res.json(product);
    }).catch(next);
});

router.get('/product', (req,res,next)=>{
    Product.find({})
    .then((product) => {
        res.json(product);
    }).catch((err) => next(err));


});


module.exports = router;
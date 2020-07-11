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

router.delete('/deleteProduct/:id', auth.verifyUser, (req, res, next)=> {
    Product.findByIdAndDelete(req.params.id)
    .then((product)=>{
        res.json({status:"deleted"});
    })
}); 

//update single post posted by users
router.put('/:id/Update', auth.verifyUser,(req, res, next)=>
{
    newproduct = {
        product_name:req.body.product_name, 
        description: req.body.description,
        price:req.body.price, 
        image: req.body.image,

        }
 Product.findByIdAndUpdate(req.params.id,  {$set:newproduct},{new:true})
    .then((reply)=>{
        if(reply == null) throw new Error("post not found");
        res.json(reply);
    }).catch(next);

});


module.exports = router;
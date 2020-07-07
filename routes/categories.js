const express = require('express');
const Category = require('../models/categories');
const auth = require('../auth');
const router = express.Router();

router.route('/category', auth.verifyUser)
.post((req,res,next) => {
    let categories = new Category(req.body);
    categories.category_name = req.body.category_name;
    categories.category_image = req.body.category_image;
    categories.save()
    .then((categories) => {
        res.statusCode = 201;
        res.json(categories);
    }).catch(next);
});


router.get('/category', (req,res,next)=>{
    Category.find({})
    .then((category) => {
        res.json(category);
    }).catch((err) => next(err));


});


module.exports = router;
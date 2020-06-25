const express = require('express');
const Category = require('../models/categories');
const router = express.Router();

router.route('/postCategory')
.post((req,res,next) => {
    let categories = new Category(req.body);
    categories.save()
    .then((categories) => {
        res.statusCode = 201;
        res.json(categories);
    }).catch(next);
});


module.exports = router;
const express = require('express');
const Category = require('../models/categories');
const auth = require('../auth');
const router = express.Router();

router.route('/category', auth.verifyUser)
.post((req,res,next) => {
    let categories = new Category(req.body);
    categories.category_name = req.body.category_name;
    categories.save()
    .then((categories) => {
        res.statusCode = 201;
        res.json(categories);
    }).catch(next);
});


module.exports = router;
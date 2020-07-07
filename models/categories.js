
const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name:{
        type: String
    },

    category_image:{
        type: String
    }
}
    , {timestamps: true});

module.exports = mongoose.model('Category', categorySchema);
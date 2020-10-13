const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    product_name:{
        type: String
      
    },
    description:{
        type:String
    },

    quantity:{
        type:Number
    },

    price:{
        type:String
    },
    

    product_image:{
        type:String
    },

}
    , {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
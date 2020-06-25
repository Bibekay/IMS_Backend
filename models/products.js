const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categories"
    },

    product_name:{
        type: String
      
    },

    product_image:{
        type:String
    },

    description:{
        type:String
    },

    Quantity:{
        type:Number
    },

    price:{
        type:String
    }
}
    , {timestamps: true});

module.exports = mongoose.model('Products', productsSchema);
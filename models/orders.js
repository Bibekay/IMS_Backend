const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Product"
    },

    order_status:{
        type: String,
        default:"pending"
        
    }
}
    , {timestamps: true});

module.exports = mongoose.model('Orders', orderSchema);
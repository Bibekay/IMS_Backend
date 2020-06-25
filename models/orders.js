const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Products"
    },

    order_status:{
        type: String,
        default:"pending"
        
    }
}
    , {timestamps: true});

module.exports = mongoose.model('Orders', ordersSchema);
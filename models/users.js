const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
    
        unique: true
    },
    username: {
        type: String,
        
        unique: true
    },
    contact:{
        type: String,
        
        unique: true
    },
    email: {
        type: String,
        
        unique: true
    },
    password: {
        type: String,
        
    },

    birthyear:{
        type:String,
        required:false
    },
    gender:{
        type:String,
        required: false
    },
    image:{
        type:String,
        required:false
    },
    admin:{
        type:Boolean,
        default:false
    }


}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);
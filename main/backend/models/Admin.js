const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    }
})
module.exports= mongoose.model('admin', adminSchema);
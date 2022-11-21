const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    
    question1:{
        type:Number,
        required:true
    },
    question2:{
        type:Number,
        required:true
    },
    question3:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    },
    fbcity:{
        type:String,
        required:true
    },
    fbdistrict:{
        type: String,
        required: true
    },
    fbsubdivision:{
        type: String,
        required: true
    },
    fbpoliceStation:{
        type: String,
        required: true
    }

  
})
module.exports = mongoose.model('feedback', feedbackSchema);
const mongoose = require('mongoose');

const policeStationSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    subdivision: {
        type: String
    },
    district: {
        type: String,
        required:true
    }
})
module.exports = mongoose.model('policestation', policeStationSchema);
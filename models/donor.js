const mongoose = require('mongoose');

const schema = mongoose.Schema;

const donorSchema = new schema({
    category : {
        type: String,
        required: true
    },
    institute : {
        type: String,
        required: true
    },
    rollno : {
        type: Number,
        required: true
    },
    donorName : {
        type: String,
        required: true
    },
    sex : {
        type: String,
        required: true
    },
    bloodGroup : {
        type: String,
        required: true
    },
    bank : {
        type: String,
        required: true
    },
    mobileNumber : {
        type: Number,
        required: true
    },
    giftRecieved : {
        type: String,
        required: true
    },
    course : {
        type:String
    },
    year : {
        type:Number
    }            
});



module.exports = mongoose.model('instdonor',donorSchema);

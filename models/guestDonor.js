const mongoose= require('mongoose');
const schema=mongoose.Schema;

const guestSchema = new schema({
    SerialNo:{
        type:Number,
        required:true
    },
    donorName : {
        type: String,
        required: true
    },
    age : {
        type: Number
    },
    Institute:{
        type:String
    }
    ,
    rollno : {
        type:Number
    }
    ,
    Department: {
        type:String
    },
    year : {
        type:String
    },    
    Gender : {
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
    }           
});

module.exports = mongoose.model('guestdonor',guestSchema);
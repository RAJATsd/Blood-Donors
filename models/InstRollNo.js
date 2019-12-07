const mongoose = require('mongoose');

const schema = mongoose.Schema;

const rollNoSchema = new schema({
    SerialNo:{
        type:Number,
        required:true
    },
    RollNumber : {
        type:Number,
        required:true
    },
    bank : {
        type:String,
        required:true
    },
    GiftRecieved : {
        type : String,
        required : true
    },
    StudentType:{
        type:String
    },
    Institute:{
        type:String
    },
    FullName : {
        type: String,
        required:true
    },
    BloodGroup:{
        type:String,
        required:true
    },
    Department :{
        type:String,
        required:true
    },
    Gender:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('InstDonor2019',rollNoSchema);
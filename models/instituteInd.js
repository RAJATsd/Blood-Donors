const mongoose = require('mongoose');

const schema = mongoose.Schema;

const memberSchema = new schema({
    FullName: {
        type:String,
    },
    Department: {
        type:String,
    },
    Institute: {
        type: String,
        default:'JMIT'
    },
    RollNumber:{
        type:Number,
    },
    Gender : {
        type:String
    },
    Email : {
        type:String
    },
    MobileNo : {
        type:Number
    },
    BloodGroup : {
        type:String
    }
});

module.exports = mongoose.model('memberOfClg',memberSchema);


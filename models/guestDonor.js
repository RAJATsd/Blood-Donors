const mongoose= require('mongoose');
const schema=mongoose.Schema;

const guestSchema = new schema({
    uniqueId : {
        type: String,
        required:true
    },
    category : {
        type: String,
        required: true
    },
    donorName : {
        type: String,
        required: true
    },
    age : {
        type: Number,
        required: true
    },
    fatherName : {
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
    }           
});

module.exports = mongoose.model('guestdonor',guestSchema);
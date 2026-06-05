const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    businessName: {
        type: String,
        require: true
    },
    email:{
        type: String,
         require: true,
         unique: true
    },
    username: {
        type: String,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    refCode: {
        type: String,

    },
    Country: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    },
    pinCode: {
        type: String,
        require: true
    },
    gstTax: {
        type: String
    },
    fullAddress: {
        type: String,
        require: true
    }
});

const user = mongoose.model('users', userSchema);
module.exports = user;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: false},
    mobile: {type: Number, required: false},
    countrycode: {type: Number, required: false},
    email: {type: String, required: false},
    userid: {type: Number, required: false},
    password_hash: {type: String, required: true},
    createddate: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);
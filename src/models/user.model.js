const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {type: String, required: false},
    mobile: {type: Number, required: false},
    countrycode: {type: Number, required: false},
    email: {type: String, required: false},
    userid: {type: Number, required: false},
    createddate: {type: Date, default: Date.now}
});

var userAuthSchema = new Schema({
    mobile: {type: Number, required: false},
    email: {type: String, required: false},
    password: {type: String, required: false},
    createddate: {type: Date, default: Date.now}
});

userAuthSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password)
};

module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('UserAuth', userAuthSchema);
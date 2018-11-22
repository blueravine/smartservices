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

// var favStopSchema = new Schema ({
//     name: {type: String, required: false},
//     id: {type: Number, required: false}
// });

// var favRouteSchema = new Schema ({
//     from: {type: String, required: false},
//     to: {type: String, required: false}
// });

// var userFavSchema = new Schema({
//     mobile: {type: Number, required: false},
//     favstops: [favStopSchema],
//     favroutes: [favRouteSchema]
// });

module.exports = mongoose.model('User', userSchema);
// module.exports = mongoose.model('UserFavs', userFavSchema);
// module.exports = mongoose.model('UserFavStop', favRouteSchema);
// module.exports = mongoose.model('UserFavRoute', favRouteSchema);
const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

var responseSchema = new Schema({
    message: {type: String, default: 'success'},
    data: {type: JSON, required: false},
    createddate: {type: Date, default: Date.now}
});
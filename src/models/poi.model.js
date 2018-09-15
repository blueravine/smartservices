const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var poiSchema = new Schema({
    id: {type: Number, required: false},
    code: {type: String, required: false},
    name: {type: String, required: false},
    type: {type: String, required: false},
    subtype: {type: String, required: false},
    lattitude: {type: String, required: false},
    longitude: {type: String, required: false},
    nearby: [{
                id: {type: Number, required: false},
                code: {type: String, required: false},
                name: {type: String, required: false},
    }],
    agencynum: {type: String, required: false},
    createddate: {type: Date, default: Date.now},
    updateddate: {type: Date, default: Date.now}
        
});

module.exports = mongoose.model('POI', poiSchema);
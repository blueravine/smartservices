const Schema = require('schm');
const POI = require('../models/poi.model');

var apiResponse = Schema({
    message: {type: String, default: 'success'},
    // POI,
    // createddate: {type: Date, default: Date.now},
    // updateddate: {type: Date, default: Date.now}
});
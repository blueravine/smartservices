const POI = require('../models/poi.model');
const response = require('../schemas/api.response.poi');

exports.poi_create = function (req, res, next) {
    console.log('creating poi');

    let poi = new POI({
        id: req.body.id,
        code: req.body.code,
        name: req.body.name,
        type: req.body.type,
        subtype: req.body.subtype,
        lattitude: req.body.lattitude,
        longitude: req.body.longitude,
        agencynum: req.body.agencynum,
    });

        poi.nearby = req.body.nearby.map( (currentnearby) => {
            return {
                id: currentnearby.id,
                code: currentnearby.code,
                name: currentnearby.name,
            }
        });
    
    poi.save(function (err) {
        if (err) {
            return next(err);
        }
        response.message = 'poi created';
        response.POI = poi;
        res.send(response);
    })

};

exports.poi_details = function (req, res, next) {
    console.log('retrieving poi');

    POI.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        
        if(poi) {
            response.message = 'poi found';
            response.POI = poi;
        }
        else {
            response.message = 'poi not found';
            response.POI = '';
        }
        res.send(response);
    })
};

exports.poi_details_byname = function (req, res, next) {
    console.log('retrieving poi by name');

    POI.find({"name": {"$regex": req.body.name, "$options":"i"}}, function (err, poi) {
        if (err) {
            return next(err);
        }

        if(poi) {
        response.message = 'poi found';
        response.POI = poi;
        }
        else {
            response.message = 'poi not found';
            response.User = '';
        }
        res.send(response);
    })
};

exports.poi_update_byname = function (req, res, next) {
    console.log('updating poi by name');

    User.findOneAndUpdate({"name": req.body.name}, {$set: req.body}, function (err, poi) {
        if (err) {
            return next(err);
        }
        if(poi) {
            response.message = 'poi updated';
            response.POI = poi;
            }
            else {
                response.message = 'poi not found';
                response.POI = '';
            }        

            res.send(response);
    })
};
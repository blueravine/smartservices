const POI = require('../models/poi.model');
const response = require('../schemas/api.response.poi');

exports.poi_create = function (req, res, next) {
    console.log('creating poi');

    req.body.forEach(element => {
        
    var poi = new POI({
        id: element.id,
        code: element.code,
        name: element.name,
        type: element.type,
        subtype: element.subtype,
        lattitude: element.lattitude,
        longitude: element.longitude,
        agencynum: element.agencynum,
    });

        poi.nearby = element.nearby.map( (currentnearby) => {
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
        // response.message = 'poi created';
        // response.POI = poi;
    })
});


res.send('poi created');

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
const User = require('../models/user.model');
const response = require('../schemas/api.response');

//Test
exports.test = function (req, res) {
    console.log('Hello there!');
    res.send('Hello!');
};

exports.register = function (req, res, next) {
    var newUser = user_create(req);
    
};

exports.sign_in = function (req, res, next) {
    
};

exports.loginRequired = function (req, res, next) {

};

exports.user_create = function (req, res, next) {
    console.log('creating user');

    let user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        countrycode: req.body.countrycode,
        emailid: req.body.emailid
    });

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        response.message = 'user created';
        response.User = user;
        res.send(response);
    })

};

exports.user_details = function (req, res, next) {
    console.log('retrieving user');

    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        
        if(user) {
            response.message = 'user found';
            response.User = user;
        }
        else {
            response.message = 'user not found';
            response.User = '';
        }
        res.send(response);
    })
};

exports.user_details_bymobile = function (req, res, next) {
    console.log('retrieving user by mobile');

    User.findOne({"mobile": req.body.mobile}, function (err, user) {
        if (err) {
            return next(err);
        }

        if(user) {
        response.message = 'user found';
        response.User = user;
        }
        else {
            response.message = 'user not found';
            response.User = '';
        }
        res.send(response);
    })
};

exports.user_update_bymobile = function (req, res, next) {
    console.log('updating user by mobile');

    User.findOneAndUpdate({"mobile": req.body.mobile}, {$set: req.body}, function (err, user) {
        if (err) {
            return next(err);
        }
        if(user) {
            response.message = 'user updated';
            response.User = user;
            }
            else {
                response.message = 'user not found';
                response.User = '';
            }        

            res.send(response);
    })
};
const User = require('../models/user.model');

//Test
exports.test = function (req, res) {
    console.log('Hello there!');
    res.send('Hello!');
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
        res.send(user);
    })

};

exports.user_details = function (req, res, next) {
    console.log('retrieving user');

    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send(user);
    })
};

exports.user_details_bymobile = function (req, res, next) {
    console.log('retrieving user by mobile');

    User.findOne({"mobile": req.body.mobile}, function (err, user) {
        if (err) {
            return next(err);
        }
        res.send(user);
    })
};
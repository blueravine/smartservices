const User = require('../models/user.model');
const response = require('../schemas/api.response.user');
const bcrypt = require('bcrypt');
const smartjwt = require('../../utils/jwt');

var signOptions = {
    issuer: "smartservices",
    subject: "",
    audience: ""
    
};

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

    var user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        countrycode: req.body.countrycode,
        email: req.body.emailid,
        password_hash: bcrypt.hashSync(req.body.password, 10)
    });

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        response.message = 'user created';
        var {password_hash, ...withoutpwdhash} = user.toObject();
        response.User = withoutpwdhash;
        res.send(response);
    })

};

exports.user_authenticate = function (req, res, next) {
    console.log('authenticating user');

    User.findOne({"mobile": req.body.mobile}, function (err, user) {
        if (err) {
            return next(err);
        }

        if(user) {
            console.log('user found authenticating');

            if(bcrypt.compareSync(req.body.password, user.password_hash)){
                let {password_hash, ...withoutpwdhash} = user.toObject();
                signOptions.subject=req.body.mobile;
                signOptions.audience=req.body.jwtaudience;
                let token = smartjwt.sign({mobile: req.body.mobile},signOptions);
                console.log('user authenticated');
                response.message = 'user authenticated';
                response.User = withoutpwdhash;
                response.token = token;
            }
            else {
                console.log('password invalid');
                response.message = 'user authentication failed';
                response.User = req.body.mobile;
                response.token = null;
            }

        }
        else {
            response.message = 'user not found';
            response.User = req.body.mobile;
            response.token = null;
        }
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
            let {password_hash, ...withoutpwdhash} = user.toObject();
            response.User = withoutpwdhash;
            }
        else {
            response.message = 'user not found';
            response.User = '';
        }
        res.send(response);
    }).select('-password_hash')
};

exports.user_details_bymobile = function (req, res, next) {
    console.log('retrieving user by mobile');

                User.findOne({"mobile": req.body.mobile}, function (err, user) {
                    if (err) {
                        console.log('error while finding user by mobile.');
                        return next(err);
                    }

                    if(user) {
                        console.log('found user by mobile.');
                    response.message = 'user found';
                    response.User = user;
                    }
                    else {
                        console.log('user not found by mobile.');
                        response.message = 'user not found';
                        response.User = '';
                    }
                    res.send(response);
                }).select('-password_hash')
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
    }).select('-password_hash')
};
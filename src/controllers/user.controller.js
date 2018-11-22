const User = require('../models/user.model');
// const UserFavs = require('../models/user.model');
// const UserFavStop = require('../models/user.model');
// const UserFavRoute = require('../models/user.model');
const response = require('../schemas/api.response.user');
const bcrypt = require('bcrypt');
const smartjwt = require('../../utils/jwt');

let signOptions = {
    issuer: "smartservices",
    subject: "",
    audience: ""
    
};

//Test
exports.test = function (req, res) {
    console.log('Hello there!');
    response.status=200;
    response.message = 'Hello!';
    response.User=null;
    response.token=null;
    res.status(response.status).send(response);
};

exports.register = function (req, res, next) {
    var newUser = user_create(req);
    
};

exports.user_create = function (req, res, next) {
    console.log('creating user');

    let user = new User({
        name: req.body.name,
        mobile: req.body.mobile,
        countrycode: req.body.countrycode,
        email: req.body.emailid,
        password_hash: bcrypt.hashSync(req.body.password, 10)
    });

    user.save(function (err) {
        if (err) {
            console.log('error while creating user' + err);
            return next(err);
        }
        console.log('user created');
        response.message = 'user created';
        let {password_hash, ...withoutpwdhash} = user.toObject();
        response.status=200;
        response.User = withoutpwdhash;
        response.token = null;
        res.status(response.status).send(response);
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
                signOptions.subject=req.body.mobile.toString();
                signOptions.audience=req.body.jwtaudience;
                let token = smartjwt.sign({mobile: req.body.mobile},signOptions);
                console.log('user authenticated');
                response.status=200;
                response.message = 'user authenticated';
                response.User = withoutpwdhash;
                response.token = token;
            }
            else {
                console.log('password invalid');
                response.status=200;
                response.message = 'user authentication failed';
                response.User = req.body.mobile;
                response.token = null;
            }

        }
        else {
            response.status=200;
            response.message = 'user not found';
            response.User = req.body.mobile;
            response.token = null;
        }
        res.status(response.status).send(response);
    })
};

exports.user_verify_token = function (req, res, next) {

                console.log('user token is valid.');
                response.status=200;
                response.message = 'jwt token valid';
                response.User = req.body.mobile;
                response.token = req.token;
        
        res.status(response.status).send(response);
    
};

exports.user_details = function (req, res, next) {
    console.log('retrieving user');

    User.findById(req.params.id, function (err, user) {
        if (err) {
            return next(err);
        }
        
        if(user) {
            response.status=200;
            response.message = 'user found';
            let {password_hash, ...withoutpwdhash} = user.toObject();
            response.User = withoutpwdhash;
            response.token=null;
            }
        else {
            response.status=200;
            response.message = 'user not found';
            response.User = null;
            response.token=null;
        }
        res.status(response.status).send(response);
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
                    response.status=200;
                    response.message = 'user found';
                    response.User = user;
                    response.token=null;
                    }
                    else {
                        console.log('user not found by mobile.');
                        response.status=200;
                        response.message = 'user not found';
                        response.User = null;
                        response.token=null;
                    }
                    res.status(response.status).send(response);
                }).select('-password_hash')
};

exports.user_update_bymobile = function (req, res, next) {
    console.log('updating user by mobile');
    
    User.findOneAndUpdate({"mobile": req.body.mobile}, {$set: req.body}, function (err, user) {
        if (err) {
            return next(err);
        }
        if(user) {
            response.status=200;
            response.message = 'user updated';
            response.User = user;
            response.token=null;
            }
            else {
                response.status=200;
                response.message = 'user not found';
                response.User = null;
                response.token=null;
            }        

            res.status(response.status).send(response);
    }).select('-password_hash')
};

// exports.user_fav_add = function (req, res, next) {
//     console.log('adding user favorite');

//     let userFavFromStop = new UserFavStop({
//         name: req.body.from
//     });

//     let userFavToStop = new UserFavStop({
//         name: req.body.to
//     });

//     let userFavRoute = new UserFavRoute({
//         name: req.body.from,
//         to: req.body.to
//     });

//     let userFav = new UserFavs({
//         mobile: req.body.mobile,
//     });

//     userFav.favstops.push(userFavFromStop);
//     userFav.favstops.push(userFavToStop);
//     userFav.favroutes.push(userFavRoute);

//     userFav.save(function (err) {
//         if (err) {
//             console.log('error while creating user' + err);
//             return next(err);
//         }
//         console.log('user created');
//         response.message = 'user created';
//         let {password_hash, ...withoutpwdhash} = user.toObject();
//         response.status=200;
//         response.User = withoutpwdhash;
//         response.token = null;
//         res.status(response.status).send(response);
//     })

// };
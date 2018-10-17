const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config.json');
const smartjwt = require('./utils/jwt');

//Import routes for the user
const user = require('./src/routes/user.route');

//Import routes for the points of interest
const poi = require('./src/routes/poi.route');

//initial smart services api
const app = express();

//set up MongoDB connection with mongoose
const mongoose = require('mongoose');

let db_url = 'mongodb://localhost:27017/smartran';
const mongoDB = process.env.MONGODB_URI || config.MONGODB_URI || db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true} );
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

let signOptions = {
    issuer: "smartservices",
    subject: "",
    audience: ""
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

smartjwt.getToken.unless = require('express-unless');
    
app.use(smartjwt.getToken.unless({
            path: [
                '/user/register',
                '/user/login',
                '/user/mobile',
                '/poi/create',
                '/poi/:id',
                '/poi/name'
            ]
        }));

const verifyToken = function (req, res, next) {
        signOptions.subject=req.body.mobile;
        signOptions.audience=req.body.jwtaudience;

        if(smartjwt.verify(req.token, signOptions)){
            next();
        }
        else {
             res.sendStatus(403);
        }
}

verifyToken.unless = require('express-unless');
app.use(verifyToken.unless({
        path: [
            '/user/register',
            '/user/login',
            '/user/mobile',
            '/poi/create',
            '/poi/:id',
            '/poi/name'
        ]
    })
);

app.use('/user', user);
app.use('/poi', poi);

app.use(function (req, res, next) {
    console.log("Cannot find RESTful resource!");
    res.sendStatus(404);
  });

app.use(function (err, req, res, next) {
console.error(err.stack);
res.sendStatus(500);
});

const port = process.env.PORT || config.PORT || 3036;

app.listen(port, () => {
    console.log('Server is running on the port' + port);
});
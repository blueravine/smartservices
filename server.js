const express = require('express');
const bodyParser = require('body-parser');

//Import routes for the user
const user = require('./src/routes/user.route');

//Import routes for the points of interest
const poi = require('./src/routes/poi.route');

//initial smart services api
const app = express();

//set up MongoDB connection with mongoose
const mongoose = require('mongoose');

let db_url = 'mongodb://localhost:27017/smartran'
const mongoDB = process.env.MONGODB_URI || db_url;

mongoose.connect(mongoDB, {useNewUrlParser: true} );
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/users', user);
app.use('/poi', poi);

const port = process.env.PORT || 3036;

app.listen(port, () => {
    console.log('Server is running on the port' + port);
});
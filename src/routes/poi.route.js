const express = require('express');
const router = express.Router();

//Require the controllers
const poi_controller = require('../controllers/poi.controller');

//create user
router.post('/create', poi_controller.poi_create);

//get user by id
router.get('/:id', poi_controller.poi_details);

//get user by field
router.post('/name', poi_controller.poi_details_byname);

//update user by field
router.put('/name', poi_controller.poi_update_byname);

module.exports = router;
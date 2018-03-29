var express 	    = require("express"),
	restaurants 	= express.Router(),
	RestaurantCtrl	= require('./resturant.controller');

restaurants.route('/')
    .get(RestaurantCtrl.filter)
	.post(RestaurantCtrl.save);/*

restaurants.route('/restaurants/:id')	
    .get(RestaurantCtrl.findById)
    .update(RestaurantCtrl.update);
*/
module.exports = restaurants;
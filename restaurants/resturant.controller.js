var mongoose 		= require('mongoose');
var Restaurant      = require('./restaurant.model');
var env				= require('../environment');
var responseUtils	= require('../utils/responseUtils');

exports.filter = function(request, response){
    const query = request.query || {};
    Restaurant
        .find(query)
        .populate({ path: 'plates', select: 'name' })
        .populate({ path: 'city', select: 'name' })
        .exec(function(err, restaurants){
            if(err) response.status(200).jsonp(responseUtils.buildErrorMessage(err));
            else response.status(200).jsonp(responseUtils.buildSuccessResponse(
                    {restaurants: restaurants}));
    });
}; 

exports.save = function(request, response){
    const requestRestaurant = request.body.restaurant;
    const restaurant = new Restaurant(requestRestaurant);
    restaurant.save(function(err, restaurant){
        if(err) response.status(200).jsonp(responseUtils.buildErrorMessage(err));
        else response.status(200).jsonp(responseUtils.buildSuccessResponse(
                {restaurant: restaurant}));
    });
}; 
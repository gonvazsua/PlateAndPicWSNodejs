var express 	= require("express"),
	users 	    = express.Router(),
	UserCtrl	= require('./user.controller');

users.route('/')	
	.get(UserCtrl.findAll);

module.exports = users;
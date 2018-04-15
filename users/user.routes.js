var express 	= require("express"),
	users 	    = express.Router(),
	UserCtrl	= require('./user.controller')

users.route('/')	
	.get(UserCtrl.findAll)

users.route('/updatePassword/:id')
	.post(UserCtrl.updatePassword)

module.exports = users
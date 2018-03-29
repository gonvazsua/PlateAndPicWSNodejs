var mongoose 		= require('mongoose');
var User			= require('../users/user.model');
var env				= require('../environment');
var jwt    			= require('jsonwebtoken');
var bcrypt   		= require('bcrypt-nodejs');
var responseUtils	= require('../utils/responseUtils');
var userCtrl		= require('../users/user.controller');
var tokenUtils		= require('../utils/tokenUtils');
var cryptUtils		= require('../utils/cryptUtils');

exports.authenticateEmail = function(req, response){
	const parsedPayload = decodeAndParsePayLoad(req.body.payload);
	User.findOne({email: parsedPayload.email}, function(error, user) {
		if(error || !user) response.json(responseUtils.buildErrorMessage('Incorrect login'));
		else matchPasswordsAndBuildToken(user, parsedPayload.password, response);
	});
};

exports.authenticateUsername = function(req, response) {
	const parsedPayload = decodeAndParsePayLoad(req.body.payload);
	User.findOne({username : parsedPayload.username}, (error, user) => {
		if(error || !user) response.json(responseUtils.buildErrorMessage('Incorrect login'));
		else matchPasswordsAndBuildToken(user, parsedPayload.password, response);
	});
};

exports.signup = function(req, response) {
	const parsedData = decodeAndParsePayLoad(req.body.payload);
	User.findOne({$or: [ {email: parsedData.email}, {username: parsedData.username}]})
		.exec((err, user) => {
			if (user) response.status(200).jsonp(responseUtils.buildErrorMessage('El usuario o email ya están registrados'));
			else {
				userCtrl.addUser(parsedData, response, function(err, user) {
					if(err || !user) response.status(200).jsonp(responseUtils.buildErrorMessage('Error al registrar'));
					else {
						const token = tokenUtils.generateToken(user._id);
						response.status(200).jsonp(responseUtils.buildSuccessResponse({user: user, token, token}));
					}
				});
			}
	});
}; 

const matchPasswordsAndBuildToken = function(user, requestPassword, response) {
	if(cryptUtils.matchPasswords(requestPassword, user.password)){
		user.lastLogin = new Date();
		userCtrl.save(user);
		const token = tokenUtils.generateToken(user._id);
		response.status(200).jsonp(responseUtils.buildSuccessResponse({user: user, token, token}));
	} else response.status(200).jsonp(responseUtils.buildErrorMessage('Incorrect login'));
};

const decodeAndParsePayLoad = function(codedPayload) {
	const decoded = cryptUtils.decodeBase64(codedPayload);
	return JSON.parse(decoded);
};
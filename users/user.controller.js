var mongoose 			= require('mongoose');
var User 				= mongoose.model('User');
var cryptUtils			= require('../utils/cryptUtils');
var responseUtils		= require('../utils/responseUtils');
var tokenUtils			= require('../utils/tokenUtils');

exports.findAll = function(req, res) {
	User.find(function(err, users){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(users);
	});
};

exports.findById = function(req, res) {
	User.findById(req.params.id, function(err, user){
		if(err) res.send(500, err.message);
		res.status(200).jsonp(user);
	});
};

exports.addUser = function(data, response, callback) {
	const codedPassword = cryptUtils.encodePassword(data.password);
	var user = new User({
		password          : codedPassword,
		email             : data.email,
		firstname         : data.firstname,
		lastname          : data.lastname,
		username		  : data.username,
		status            : 1,
		role              : 1,
		lastLogin         : new Date(),
		picture           : data.picture,
		restaurants       : data.restaurants,
		city              : data.city,
		createdDate       : new Date(),
		updatedDate       : new Date()
	});

	user.save(callback);
};

const buildUserResponse = function() {

};

exports.update = function(req, res) {
	User.findById(req.params.id, function(err, user){
		if(err) res.send(500, err.message);

		user.email 			= req.body.email;
		user.name 			= req.body.name;
		user.lastname 		= req.body.lastname;
		user.isConfirmed	= req.body.isConfirmed;
		user.isActive		= req.body.isActive;
		user.useBus			= req.body.useBus;
		user.allergies		= req.body.allergies;
		user.isAdmin		= req.body.isAdmin;
		user.address		= req.body.address;
		user.city			= req.body.city;
		user.postalCode		= req.body.postalCode;
		user.companion		= req.body.companion;

		user.save(function(err, user){
			if(err) res.send(500, err.message);
			res.status(200).jsonp(user);
		});

	});
};

exports.save = function(user) {
    user.save(function(err, user){
        if(err) return null;
        return user;
    });
}

exports.updatePassword = function(req, res) {
	const parsedData = decodeAndParsePayLoad(req.body.passwords);
	User.findById(req.params.id, function(err, user){
		if(cryptUtils.matchPasswords(parsedData.lastPassword, user.password)){
			user.password = cryptUtils.encodePassword(parsedData.newPassword)
			user.save((err, user) => res.status(200).jsonp(user))
		} else res.status(200).jsonp(responseUtils.buildErrorMessage('Las passwords no coinciden'))
	})
}

const decodeAndParsePayLoad = function(passwords) {
	const decoded = cryptUtils.decodeBase64(passwords);
	return JSON.parse(decoded);
};
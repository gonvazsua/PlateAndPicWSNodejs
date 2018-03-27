var express 	= require("express"),
	auths 	    = express.Router(),
	AuthCtrl	= require('./auth.controller');

auths.route('/authenticate/email')	
	.post(AuthCtrl.authenticateEmail);

auths.route('/authenticate/username')	
	.post(AuthCtrl.authenticateUsername);

auths.route('/signup')	
	.post(AuthCtrl.signup);

module.exports = auths;
var env       = require('../environment');
var jwt       = require('jsonwebtoken');
var tokenUtils = require('../utils/tokenUtils');
var responseUtils = require('../utils/responseUtils');

exports.tokenVerify = function(req, res, next) {
  	var token = tokenUtils.getTokenFromRequest(req);
	if (token) {
		var validatedToken = tokenUtils.validateToken(token);
		if(!validatedToken)  return responseUtils.forbidden(res, "Token not valid");
		else {
			req.decoded = decoded;    
          	next();
		}
  	} else return responseUtils.forbidden(res, "No token provided");
};
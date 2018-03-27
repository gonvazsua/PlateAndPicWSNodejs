var jwt    			= require('jsonwebtoken');
var env             = require('../environment');

exports.generateToken = function(userId) {
    var payload = this.generatePayload(userId);
    return jwt.sign(payload, env.secret, {expiresIn: env.tokenExpire});
}

exports.generatePayload = function(userId) {
    return { userId: userId };
}

exports.getTokenFromRequest = function(request) {
    var token = request.body.token || request.query.token || request.headers['Authorization'];
}

exports.validateToken = function(token) {
    jwt.verify(token, env.secret, function(err, decoded) {      
        if (err) {
            console.log(err);
            return null;
        } else return decoded;
    });
}
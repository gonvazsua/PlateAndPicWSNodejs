const env       = require('../../environment');
const jwt       = require('jsonwebtoken');
const responseUtils = require('../../utils/response-utils')

exports.allowCrossDomain = function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token")
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    if ('OPTIONS' === req.method)  res.sendStatus(responseUtils.OK)
    else next()
}

exports.tokenVerify = function(req, res, next) {
  	var token = getTokenFromRequest(req)
	if (token) {
        jwt.verify(token, env.secret, (err, decoded) => {
            if(err) res.status(responseUtils.FORBIDDEN).jsonp(responseUtils.buildError('Token not valid'))
            else {
                req.tokenData = decoded
          	    next()
            }
        })
  	} else res.status(responseUtils.FORBIDDEN).jsonp(responseUtils.buildError('Token not valid'))
}

const getTokenFromRequest = request => {
    return request.body.token || request.query.token || request.headers['authorization'] || null
}
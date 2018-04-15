const express = require("express")
const routes = express.Router()
const authService = require('./auth.service')
const responseUtils = require('../utils/response-utils')

routes.route('/login').post((req, res) => {
	const b64Data = req.body.data
	if(!b64Data) res.status(responseUtils.NO_DATA).jsonp(responseUtils.buildError('No data provided'))
	else {
		authService.login(b64Data, (status, err, token) => {
			if(err) res.status(status).jsonp(responseUtils.buildError(err))
			else res.status(status).jsonp(token)
		})	
	}
})

routes.route('/signup').post((req, res) => {
	const b64Data = req.body.data
	if(!b64Data) res.status(responseUtils.NO_DATA).jsonp(responseUtils.buildError('No data provided'))
	else {
		authService.signup(b64Data, (status, err, token) => {
			if(err) res.status(status).jsonp(responseUtils.buildError(err))
			else res.status(status).jsonp(token)
		})	
	}
})

module.exports = routes
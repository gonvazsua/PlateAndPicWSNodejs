const express = require("express")
const routes = express.Router()
const ppService = require('./plate-picture.service')
const responseUtils = require('../utils/response-utils')
const middleware = require('../config/middlewares/middleware')

routes.route('/user/:id').get((req, res) => {
    ppService.findByUserId(req.params.id, (status, err, platePictures) => {
        if(err) res.status(status).jsonp(responseUtils.buildError(err))
        else res.status(status).jsonp(platePictures)
    })
})

routes.route('/latest').get((req, res) => {
    const pageFrom = req.params.pageFrom || 0
    const pageTo = req.params.pageTo || 0
    ppService.findLatestPlatePicturesFromUserId(req.tokenData.userId, pageFrom, pageTo, (status, err, pps) => {
        if(err) res.status(status).jsonp(responseUtils.buildError(err))
        else res.status(status).jsonp(pps)
    })
})

routes.route('/:id').get((req, res) => {
    ppService.findById(req.params.id, (status, err, platePicture) => {
        if(err) res.status(status).jsonp(responseUtils.buildError(err))
        else res.status(status).jsonp(platePicture)
    })
})

routes.route('/').post((req, res) => {
    ppService.insert(req.platePicture, (status, err, platePicture) => {
        if(err) res.status(status).jsonp(responseUtils.buildError(err))
        else res.status(status).jsonp(platePicture)
    })
})

module.exports = routes
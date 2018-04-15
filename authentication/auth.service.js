const crypt = require('../config/crypt/crypt')
const userService = require('../users/user.service')
const responseUtils = require('../utils/response-utils')

exports.login = (usernamePasswordB64, cb) => {
    const jsonData = crypt.decodeBase64(usernamePasswordB64)
    if(!jsonData) cb(responseUtils.NO_DATA, 'No data provided', null)
    else {
        const parsed = JSON.parse(jsonData)
        const codedPassword = crypt.encodePassword(parsed.password)
        userService.findByUsernameAndPassword(parsed.username, codedPassword, (err, user) => {
            if(err) cb(responseUtils.ERROR, err, null)
            else if(!user) cb(responseUtils.NOT_FOUND, 'User not found', null)
            else {
                var resObj = {}
                resObj['token'] = crypt.generateToken(user._id)
                cb(responseUtils.OK, null, resObj)
            }
        })
    }
}

exports.signup = (userB64, cb) => {
    const stringUser = crypt.decodeBase64(userB64)
    if(!stringUser) cb(responseUtils.NO_DATA, 'No data provided', null)
    else {
        const user = JSON.parse(stringUser)
        userService.findByUsernameOrEmail(user.username, user.email, (err, user) => {
            if(err) cb(responseUtils.ERROR, err, null)
            else if(user) cb(responseUtils.CONFLICT, 'User already exists', null)
            else userService.create(user, (err, user) => {
                if(err) cb(responseUtils.ERROR, err, null)
                else {
                    var resObj = {}
                    resObj['token'] = crypt.generateToken(user._id)
                    cb(responseUtils.OK, null, resObj)
                }
            })
        })
    }
}
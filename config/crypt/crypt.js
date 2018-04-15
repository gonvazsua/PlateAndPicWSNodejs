const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')
const env = require('../../environment')
const mdl = require('../middlewares/middleware')

exports.encodePassword = password => {
    return bcrypt.hashSync(password)
}

exports.matchPasswords = (cleanPassword, cryptedPassword) => {
    return bcrypt.compareSync(cleanPassword, cryptedPassword)
}

exports.decodeBase64 =  toDecode => {
    if (Buffer.byteLength(toDecode) !== toDecode.length) throw new Error('Bad string!')
    return Buffer(toDecode, 'base64').toString('binary')
}

exports.generateToken = userId => {
    var payload = { userId: userId }
    return jwt.sign(payload, env.secret, {expiresIn: env.tokenExpire})
}
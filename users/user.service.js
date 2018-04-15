const User = require('./user.model')
const crypt = require('../config/crypt/crypt')

exports.findByUsernameAndPassword = (username, password, callback) => {
    User.findOne({'username': username, 'password': password}, (err, user) => {
        if(err) {
            console.log(err)
            callback('User not found', null)
        }
        else callback(null, user)
    })
}

exports.create = (userToSave, callback) => {
    const codedPassword = crypt.encodePassword(userToSave.password)
    const user = new User({
		password          : codedPassword,
		email             : userToSave.email,
		firstname         : userToSave.firstname,
		lastname          : userToSave.lastname,
		username		  : userToSave.username,
		status            : 1,
		role              : 1,
        lastLogin         : new Date(),
        followersNumber   : 0,
        platePicturesNumber : 0,
		picture           : userToSave.picture,
		restaurants       : userToSave.restaurants,
		city              : userToSave.city,
		createdDate       : new Date(),
		updatedDate       : new Date()
    })
    user.save((err, user) => callback(err, user))
}

exports.findByUsernameOrEmail = (username, email, callback) => {
    User.findOne({$or: [
        {email: email},
        {phone: username}
    ]}, (err, user) => {
        if(err) console.log(err)
        callback(err, user)
    })
}


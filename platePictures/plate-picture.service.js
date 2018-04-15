const resUtils = require('../utils/response-utils')
const PlatePicture = require('./plate-picture.model')

exports.findById = (id, callback) => {
    PlatePicture.findById(id)
        .populate('user')
        .populate('plate')
        .populate('plate.restaurant')
        .exec((err, platePicture) => {
            if(err) callback(resUtils.ERROR, err, null)
            else if(!platePicture) callback(resUtils.NOT_FOUND, null, platePicture)
            else callback(resUtils.OK, null, platePicture)
        })
}

exports.findByUserId = (id, callback) => {
    PlatePicture.find({user: id})
        .sort([['creationDate', -1]])
        .populate('user')
        .populate('plate')
        .populate('plate.restaurant')
        .exec((err, platePictures) => {
            if(err) callback(resUtils.ERROR, err, null)
            else callback(resUtils.OK, null, platePictures)
        })
}

exports.insert = (ppToSave, callback) => {
    const platePicture = new PlatePicture({
        title             : ppToSave.title,
        commentsNumber    : 0,
        likesNumber       : 0,
        user              : ppToSave.user._id,
        plate             : ppToSave.plate._id,
        picture           : ppToSave.picture,
        creationDate      : new Date()
    })
    platePicture.save((err, pp) => {
        if(err) callback(resUtils.ERROR, err, null)
        else callback(resUtils.OK, null, pp)
    })
}

exports.findLatestPlatePicturesFromUserId = (userId, pageFrom, pageTo, callback) => {
    
    callback(resUtils.OK, null, [])
}
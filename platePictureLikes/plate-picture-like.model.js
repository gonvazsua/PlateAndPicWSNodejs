var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var PlatePictureLikeSchema 	= new Schema({
  user              : { type: Schema.Types.ObjectId, ref: 'User' },
  platePicture      : { type: Schema.Types.ObjectId, ref: 'PlatePicture' },
  creationDate      : { type: Date }
});

module.exports = mongoose.model('PlatePictureLike', likePlatePictureSchema);
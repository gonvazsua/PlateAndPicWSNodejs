var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var commentPlatePictureSchema 	= new Schema({
  user              : { type: Schema.Types.ObjectId, ref: 'User' },
  platePicture      : { type: Schema.Types.ObjectId, ref: 'PlatePicture' },
  comment           : { type: String },
  creationDate      : { type: Date }
});

module.exports = mongoose.model('CommentPlatePicture', commentPlatePictureSchema);
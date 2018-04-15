var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var platePictureCommentSchema 	= new Schema({
  user              : { type: Schema.Types.ObjectId, ref: 'User' },
  platePicture      : { type: Schema.Types.ObjectId, ref: 'PlatePicture' },
  comment           : { type: String },
  creationDate      : { type: Date }
});

module.exports = mongoose.model('PlatePictureComment', platePictureCommentSchema);
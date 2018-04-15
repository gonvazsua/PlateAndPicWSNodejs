var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var platePictureSchema 	= new Schema({
  title             : { type: String },
  commentsNumber    : { type: Number },
  likesNumber       : { type: Number },
  user              : { type: Schema.Types.ObjectId, ref: 'User' },
  plate             : { type: Schema.Types.ObjectId, ref: 'Plate' },
  picture           : { data: Buffer, contentType: String },
  creationDate      : { type: Date }
});

module.exports = mongoose.model('PlatePicture', platePictureSchema);
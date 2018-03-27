var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var citySchema 	= new Schema({
  name              : { type: String },
  province          : { type: Schema.Types.ObjectId, ref: 'Province' }
});

module.exports = mongoose.model('City', citySchema);
var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var plateSchema 	= new Schema({
  name              : { type: String },
  active            : { type: Boolean },
  restaurant        : { type: Schema.Types.ObjectId, ref: 'Restaurant' },
  createdBy         : { type: String },
  createdDate       : { type: Date },
  updatedBy         : { type: String },
  updatedDate       : { type: Date }
});

module.exports = mongoose.model('Plate', plateSchema);
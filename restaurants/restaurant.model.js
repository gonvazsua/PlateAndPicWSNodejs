var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var restaurantSchema 	= new Schema({
  name              : { type: String },
  address           : { type: String },
  phoneNumber       : { type: String },
  latitude          : { type: String },
  longitude         : { type: String },
  apiPlaceId        : { type: String },
  priveAverage      : { type: Number },
  rating            : { type: Number },
  description       : { type: String },
  state             : { type: Number },
  picture           : { data: Buffer, contentType: String },
  city              : { type: Schema.Types.ObjectId, ref: 'City' },
  plates            : [{ type: Schema.Types.ObjectId, ref: 'Plate' }],
  createdBy         : { type: String },
  createdDate       : { type: Date },
  updatedBy         : { type: String },
  updatedDate       : { type: Date }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);
var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var userSchema 	= new Schema({
  password          : { type: String },
  email             : { type: String },
  firstname         : { type: String },
  lastname          : { type: String },
  username          : { type: String },
  status            : { type: Number },
  role              : { type: Number },
  lastLogin         : { type: Date },
  picture           : { data: Buffer, contentType: String },
  restaurants       : [{ type: Schema.Types.ObjectId, ref: 'Restaurant' }],
  city              : { type: Schema.Types.ObjectId, ref: 'City' },
  updatedDate       : { type: Date },
  createdDate       : { type: Date }
});

module.exports = mongoose.model('User', userSchema);
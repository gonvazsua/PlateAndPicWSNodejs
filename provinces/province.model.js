var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var provinceSchema 	= new Schema({
  name              : { type: String },
  country           : { type: String }
});

module.exports = mongoose.model('Province', provinceSchema);
var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var followSchema 	= new Schema({
    user           : { type: Schema.Types.ObjectId, ref: 'User' },
    followTo       : { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate    : { type: Date }
});

module.exports = mongoose.model('Follow', followSchema);
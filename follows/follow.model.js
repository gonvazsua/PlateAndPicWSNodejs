var mongoose 	= require('mongoose'),
    Schema   	= mongoose.Schema;

var followSchema 	= new Schema({
    follower              : { type: Schema.Types.ObjectId, ref: 'User' },
    following             : { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate           : { type: Date }
});

module.exports = mongoose.model('Follow', followSchema);
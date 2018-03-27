var bcrypt   		= require('bcrypt-nodejs');

exports.matchPasswords = function (cleanPassword, cryptedPassword) {
    return bcrypt.compareSync(cleanPassword, cryptedPassword);
};

exports.decodeBase64 = function (toDecode) {
    if (Buffer.byteLength(toDecode) !== toDecode.length) throw new Error('bad string!');
    return Buffer(toDecode, 'base64').toString('binary');
};

exports.encodePassword = function(password) {
    return bcrypt.hashSync(password);
}
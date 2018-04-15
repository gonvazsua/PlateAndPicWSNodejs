const crypt = require('./crypt')
const assert = require('assert')

const encodedPassword = crypt.encodePassword('1234')
assert.notStrictEqual('1234', encodedPassword)

const matchPassword = crypt.matchPasswords('1234', encodedPassword)
assert.equal(matchPassword, true)

const token = crypt.generateToken(1)
assert.notEqual(token, null)
console.log(token)
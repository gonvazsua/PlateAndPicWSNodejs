const auth = require('./auth.service')
const assert = require('assert')

var json = {}
json['username'] = 'gonzalo'
json['password'] = '123456'
const base64Data = Buffer.from(JSON.stringify(json)).toString('base64')
auth.login(base64Data, (err, token) => {
    if(err) console.log(err)
    else console.log("JOOOOOO");
})

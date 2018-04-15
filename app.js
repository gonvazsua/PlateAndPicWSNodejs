const port 			          = process.env.ALWAYSDATA_HTTPD_PORT || 3000
const host 			          = process.env.ALWAYSDATA_HTTPD_IP || 'localhost'
const env  			          = require('./environment')
const express 		        = require("express")
const app 			          = express()
const bodyParser  	      = require("body-parser")
const mongoose 		        = require('mongoose')
const router 			        = express.Router()
const middlewares         = require('./config/middlewares/middleware')
const auth                = require('./authentication/auth.controller')
const platePictures		  = require('./platePictures/plate-picture.controller')

//Connection to BD
mongoose.connect(env.database, function (err, res){
	if(err)console.log('ERROR: connecting to Database. ' + err)
})

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(middlewares.allowCrossDomain)
app.use('/auth', auth)
app.use(middlewares.tokenVerify)
app.use('/platePictures', platePictures)

//Handle errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

// Start server
app.listen(port, host, function() {
	const date = new Date()
	console.log("Started served on port "+port+" at: " 
		+ date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " - " 
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds())
})
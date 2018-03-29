const port 			          = process.env.ALWAYSDATA_HTTPD_PORT || 3000;
const host 			          = process.env.ALWAYSDATA_HTTPD_IP || 'localhost';
const env  			          = require('./environment');
const express 		        = require("express"),
    app 			          = express(),
    bodyParser  	      = require("body-parser"),
    mongoose 		        = require('mongoose'),
    tokenMw 		        = require('./authentication/tokenController'),
    router 			        = express.Router(),
    auths 			        = require('./authentication/auth.routes'),
    users               = require('./users/user.routes'),
    allowCrossDomain    = require('./utils/crossDomain'),
    restaurants         = require('./restaurants/restaurant.routes');

//Connection to BD
mongoose.connect(env.database, function (err, res){
	if(err){
		console.log('ERROR: connecting to Database. ' + err);
		log.info("ERROR connectin to MongoDB");
	}
});

// Middlewares
app.use(bodyParser.json());
app.use(allowCrossDomain.allowCrossDomain);
app.use('/', auths);
app.use(tokenMw.tokenVerify);
app.use('/users', users);
app.use('/restaurants', restaurants);

//Handle errors
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send(err.stack)
})

// Start server
app.listen(port, host, function() {
	const date = new Date();
	console.log("Started served at: " 
		+ date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + " - " 
		+ date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
});
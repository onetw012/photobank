'use strict';

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require ('express-session'),
	passport = require('passport'),
	securityRoutes = require('./app/routes/securityRoutes');


var port = process.env.PORT || 4444;


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); 
app.use(session({
	secret: 'one',
	resave: false, 
	saveUninitialized: false,
	cookie: {
		/*maxAge: 3600000,*/
		secure: false
	}
}));
app.use(passport.initialize());
app.use(passport.session());

securityRoutes(app);

app.listen(port, function () {
	console.log("Listening port: " + port);
});


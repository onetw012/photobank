'use strict';

var express = require('express'),
	mongoose = require('mongoose'),
	bodyParser = require('body-parser'),
	cookieParser = require('cookie-parser'),
	session = require ('express-session'),
	MongoStore = require('connect-mongo')(session),
	passport = require('passport'),
	favicon = require('serve-favicon'),
	securityRoutes = require('./app/routes/securityRoutes'),
	app = express(),
	uristring =
		process.env.MONGOLAB_URI ||
		process.env.MONGOHQ_URL ||
		'mongodb://127.0.0.1/photosessions',
	db;


var port = Number(process.env.PORT || 4444);

/* mongoose.connect(uristring);
 db = mongoose.connection;
 db.on('error', function (err) {
 	console.log('connection error', err);
 });
 db.once('open', function () {
 	console.log('connected to mongoDB.');
 });*/

app.disable('x-powered-by');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public')); 
app.use(session({
	secret: 'one',
	resave: true, 
	saveUninitialized: false,
	cookie: {
		/*maxAge: 3600000,*/
		secure: false
	}/*,
	store: new MongoStore({ mongooseConnection: mongoose.connection })*/
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/public/img/favicon.ico'));

securityRoutes(app);

app.listen(port, function () {
	console.log("Listening port: " + port);
});

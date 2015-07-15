'use strict';

var passport = require('passport'),
	FlickrStrategy = require('passport-flickr').Strategy,
	ids = require('./oauth.js'),
	path = require('path');

module.exports = function (app) {

var User = {};

	passport.use(new FlickrStrategy({
	    consumerKey: ids.flickr.clientID,
	    consumerSecret: ids.flickr.clientSecret,
	    callbackURL: ids.flickr.callbackURL
	  },
	  function(token, tokenSecret, profile, done) {
		User = {
			token: token,
			tokenSecret: tokenSecret,
			profile: profile
		};
		return done(null, profile);
	  }
	));

	passport.serializeUser(function(user, done) {
	//    console.log('Serializing: ' + JSON.stringify(user));
	    done(null, user);
	});

	passport.deserializeUser(function(obj, done) {
	//    console.log('Deserializing: ' + obj);
	    done(null, obj);
	});


	app.get('/api/get-user', function (req, res) {
		res.json(User);
	});

	app.get('/albums', function (req, res, next) {
		req.isAuthenticated()
		? res.sendFile(path.join(__dirname, '../../public/templates/albums.html'))
		: res.redirect('/');
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

/*	app.route('/')
		.get(function (req, res) {
			res.send('<a href="/auth/flickr">Log In with Flickr</a>');
		});*/

	app.get('/auth/flickr',
	  passport.authenticate('flickr'),
	  function(req, res){
	    // The request will be redirected to Flickr for authentication, so this
	    // function will not be called.
	  });

	app.get('/auth/flickr/callback', 
	  passport.authenticate('flickr', {failureRedirect: '/' }),
	  function(req, res) {
	    // Successful authentication, redirect home.
	    req.session.user = req.user;	   
	    res.redirect('/albums');
	  });



}; 
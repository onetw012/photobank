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
		return done(null, User);
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

		res.json(req.session.passport.user);
		res.status(200);
		res.end();
	});

	app.get('/albums', function (req, res, next) {
		if(req.isAuthenticated()) {
			res.sendFile(path.join(__dirname, '../../public/templates/albums.html'));
			res.status(200);
		} else {
			res.redirect('/');
		}	
	});

	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/auth/flickr',
	  passport.authenticate('flickr'),
	  function(req, res){

	  });

	app.get('/auth/flickr/callback', 
	  passport.authenticate('flickr', {failureRedirect: '/' }),
	  function(req, res) {

	    res.redirect('/albums');
	    
	  });



}; 
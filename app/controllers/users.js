'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
   	jwt = require('express-jwt');


exports.authenticate = function(req, res) {
    User.findOne({
        email: req.body.email
    }, function(err, user) {
		if (err) {
			console.log(err);
		}
		
		var secret = 'this is a temporary secret for testing purposes only';
		var token = jwt.sign(user, secret, { expiresInMinutes: 60*5 });
		res.json({ token: token });
    });
};

exports.create = function(req, res, next) {
    var user = new User(req.body);

    user.save(function(err) {
    	if(err) {
    		console.log(err);   	
    	} else {
    		res.json(user);
    	}
    });
};
'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');

exports.authenticate = function(req, res) {
	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
	res.json({ token: token });
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
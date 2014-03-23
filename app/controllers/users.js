'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.authenticate = function(req, res) {
   if (req.body.email) {
        User.createUserToken(req.body.email, function(err, usersToken) {
            if (err) {
                res.json({error: 'Issue generating token'});
            } else {
                res.json({token : usersToken});
            }
        });
    } else {
        res.json({error: 'AuthError'});
    }
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
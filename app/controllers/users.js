'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');


exports.authenticate = function(req, res) {
    if (req.body.email) {
        User.createUserToken(req.body.email, function(err, user) {
            if (err) {
                res.json({error: 'Issue generating token'});
            } else {
                res.json({token : user.token, email: user.email});
            }
        });
    } else {
        res.json({error: 'AuthError'});
    }
};

exports.create = function(req, res) {
    var user = new User(req.body);
    user.save(function(err) {
        if(err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
};
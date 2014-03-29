'use strict';

var mongoose = require('mongoose'),
	User = mongoose.model('User');

exports.requiresLogin = function(req, res, next) {
    var incomingToken = req.headers.token,
        decoded = User.decode(incomingToken);

    if (decoded && decoded.email) {
        User.findUser(decoded.email, incomingToken, function(err, user) {
            if (err) {
                res.json({error: 'Issue finding user.'});
            } else if (!user) {
                res.send(401, 'User is not authorized');
            }
        });
    }

    next();
};
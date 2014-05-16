'use strict';

var mongoose = require('mongoose'),
		User = mongoose.model('User');

if (process.env.REDISTOGO_URL) {
		var rtg   = require("url").parse(process.env.REDISTOGO_URL);
		var redis = require("redis").createClient(rtg.port, rtg.hostname);

		redis.auth(rtg.auth.split(":")[1]);
} else {
		var redis = require("redis").createClient();
}

var redisSeperator = function(arr, splitter) {
	if(!splitter) splitter = ':';
	return arr.join(splitter);
};

exports.requiresLogin = function(req, res, next) {
    var incomingToken = req.headers.token,
        decoded = User.decode(incomingToken);

    if (decoded && decoded.email) {
			/*
        User.findUser(decoded.email, incomingToken, function(err, user) {
            if (err) {
                res.json({error: 'Issue finding user.'});
            } else if (!user) {
                res.send(401, 'User is not authorized');
            }
        });
			*/
			redis.get(redisSeperator(['user', 'token', decoded.email], ':'), function(err, res) {
				if (err) {
						res.json({error: 'Issue finding user.'});
				} else if (!res) {
						res.send(401, 'User is not authorized');
				} else {
					next();
				}
			});
    }


};

'use strict';

exports.authenticate = function(req, res) {
	var token = jwt.sign(profile, secret, { expiresInMinutes: 60*5 });
	res.json({ token: token });
};
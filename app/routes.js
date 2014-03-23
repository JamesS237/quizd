'use strict';

module.exports = function(app, passport) {
	var staticPages = require('./controllers/static');
	var users = require('./controllers/users');
	app.get('/:anything', staticPages.home);
	app.get('/', staticPages.home);

	var expressJwt = require('express-jwt');
	var secret = 'this is a temporary secret for testing purposes only';
	app.use('/api', expressJwt({secret: secret}));

};
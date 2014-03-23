'use strict';

module.exports = function(app, passport) {
	var staticPages = require('./controllers/static');
	var users = require('./controllers/users');


	var expressJwt = require('express-jwt');
	var secret = 'this is a temporary secret for testing purposes only';
	
	app.use('/api', expressJwt({secret: secret}));

	app.post('/signup', users.create);

	app.post('/authenticate', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.authenticate);

	app.get('/:anything', staticPages.home);
	app.get('/', staticPages.home);
};
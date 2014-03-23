'use strict';

module.exports = function(app, passport) {
	var staticPages = require('./controllers/static');
	var users = require('./controllers/users');
	
	app.post('/signup', users.create);

	app.post('/authenticate', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: true
    }), users.authenticate);

	app.get('/:anything', staticPages.home);
	app.get('/', staticPages.home);
};
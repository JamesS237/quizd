'use strict';

module.exports = function(app) {
	var staticPages = require('../controllers/static');
	app.get('/', staticPages.home)
};
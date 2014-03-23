'use strict';

var express = require('express'),
	http = require('http'),
	path = require('path'),
	mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
	app.use(express.errorHandler());
}

 passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },

        function(email, password, done) {

            User.findOne({
                email: email
            }, function(err, user) {
                if (err) {
                    return done(err);
                }

                if (!user) {
                    return done(null, false, {
                        message: 'Unknown user'
                    });
                }

                user.comparePassword(password, function (err, isMatch) {
                	if(err) {
                		return done(err);
                	}

	                if (isMatch) {
	                	return done(null, user)
	                } else {
	                	return done(null, false, {
	                		message: 'Invalid password'
	                    });
	                }

                });
            });
        }
    ));

mongoose.connect('mongodb://localhost/quizd');
require('./app/models/user');
require('./app/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});


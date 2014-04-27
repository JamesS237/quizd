'use strict';

var express = require('express'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	http = require('http'),
	path = require('path'),
	favicon = require('static-favicon'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	methodOverride = require('method-override'),
	cookieParser = require('cookie-parser'),
  session = require('express-session'),
  errorHandler = require('errorhandler'),
	mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app/views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(favicon());
app.use(logger('dev'));
app.use(methodOverride());
app.use(cookieParser());
app.use(bodyParser());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
	app.use(errorHandler());
}

mongoose.connect('mongodb://localhost/quizd');
require('./app/models/user');
require('./app/routes')(app, passport);

passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password'
    },

    function(email, password, done) {

        var User = mongoose.model('User');

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
					return done(null, user);
                } else {
					return done(null, false, {
						message: 'Invalid password'
					});
                }
            });
        });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

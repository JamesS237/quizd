'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    jwt = require('jwt-simple'),
    tokenSecret = 'c3VnaHBhdXJvaGdhW29zcmdpaGFbb3JnaWhhd3JbZ2F3W2lyb2doW3dyaUdI',
    troop = require('mongoose-troop');

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

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },

    password: {
        type: String,
        required: true
    },

    token: String
});
UserSchema.plugin(troop.timestamp, {createdPath:'createdAt', modifiedPath: 'updatedAt'})


UserSchema.pre('save', function(next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.encode = function(data) {
    return jwt.encode(data, tokenSecret);
};

UserSchema.statics.decode = function(data) {
    return jwt.decode(data, tokenSecret);
};

UserSchema.statics.createUserToken = function(email, callback) {
    var self = this;
    this.findOne({email: email}, function(err, user) {
        if(err || !user) {
            console.log(err);
        }

        var token = self.encode({email: email});

        user.token = token;

        user.save(function(err, user) {
            if (err) {
                callback(err, null);
            } else {
              redis.set(redisSeperator(['user', 'token', user.email], ':'), [user.token], function(err, res) { //set user\xfftoken\xff[email] to the users token
                if(err) {
                  callback(err, null);
                } else {
                  callback(false, user);
                }
              })
            }
        });
    });
};

UserSchema.statics.findUser = function(email, token, callback) {
    this.findOne({email: email}, function(err, user) {
        if(err || !user) {
            callback(err, null);
        } else if (user.token) {
            callback(false, user);
        } else {
            callback(new Error('Token does not exist or does not match.'), null);
        }
    });
};


UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);

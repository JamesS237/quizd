'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    jwt = require('jwt-simple'),
    tokenSecret = 'testsecret';

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
                callback(false, user.token);
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
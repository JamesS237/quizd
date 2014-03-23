'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

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
    }
});


UserSchema.pre('save', function(next) {
    var user = this;
    console.log('24');
    if (!user.isModified('password')) return next();
    console.log('26');
    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
            console.log('29');

        bcrypt.hash(user.password, salt, function(err, hash) {
            console.log('32');
            if (err) return next(err);
                console.log('33');

            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return callback(err);
        return callback(null, isMatch);
    });
};

mongoose.model('User', UserSchema);
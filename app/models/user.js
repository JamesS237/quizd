'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        index {
            unique: true
        }
    },

    password: { 
        type: String,
        required: true
    }
});


UserSchema.pre('save', function(next) {
    if (!this.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, function(err, hash) {
            if (err) return next(err);

            this.password = hash;
            next();
        });
    });
});



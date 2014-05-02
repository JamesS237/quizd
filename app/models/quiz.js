'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    jwt = require('jwt-simple'),
    tokenSecret = 'testsecret';

var QuizSchema = new Schema({
    title: {
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



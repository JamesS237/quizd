'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    jwt = require('jwt-simple'),
    tokenSecret = 'testsecret';

var QuestionSchema = new Schema({
  title: {
      type: String,
      required: true,
      index: {
          unique: true
      }
  },

  answers: {
    type: Array,
    required: true
  },
  
  createdAt: {
      type: Date,
      required: true
  },

  updatedAt: {
      type: Date,
      required: true
  },

  token: String
});


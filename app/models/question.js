'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema,
    jwt = require('jwt-simple'),
    tokenSecret = 'c3VnaHBhdXJvaGdhW29zcmdpaGFbb3JnaWhhd3JbZ2F3W2lyb2doW3dyaUdI';

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

});

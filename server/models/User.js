'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const Mongoose = require('mongoose'),
      bcrypt = require('bcrypt');

const userSchema = new Mongoose.Schema({
  email      : { type: 'String', required: true, index: { unique: true } },
  password   : { type: 'String', required: true },
  created_on : { type: 'Date', default: Date.now(), required: true }
});

userSchema.pre('save', function(next) {
  let user = this;

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

module.exports = Mongoose.model('User', userSchema);

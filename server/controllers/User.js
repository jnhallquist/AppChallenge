'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const User         = require('../models/User.js'),
      sanitizeHtml = require('sanitize-html');

let login = function(req, res) {
  User.find({email: req.body.user.email}, function(err, record) {
    if (err) throw err;

    record.comparePassword(req.body.user.password, function(err, isMatch) {
      if (err) throw err;
      return user;
    });
  });
};

module.exports = {
  login: login
};

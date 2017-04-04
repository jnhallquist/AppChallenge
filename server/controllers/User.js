'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const User         = require('../models/User.js'),
      bcrypt       = require('bcrypt'),
      sanitizeHtml = require('sanitize-html');

let login = function(req, res) {
  return User.find({email: req.body.email}, function(err, record) {
    if (err) throw err;
    if (!record.length) return res.sendStatus(400);

    return verifyPassword(req.body.password, record[0].password, function(err, isMatch) {
      if (err) throw err;
      res.send({_id: record[0]._id});
    });
  });
};

let verifyPassword = function(userPassword, hashPassword, cb) {
  bcrypt.compare(userPassword, hashPassword, function(err, isMatch) {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

module.exports = {
  login: login
};

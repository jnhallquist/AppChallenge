'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const Email        = require('../models/Email.js'),
      User         = require('../models/User.js'),
      sendGrid     = require('../../util/sendgrid.js'),
      sanitizeHtml = require('sanitize-html');

let getEmails = function(req, res) {
  User.findById(req.body.user_id, function(err, users) {
    if (!users) return res.statusCode(500);

    return Email.find().sort('-created_on').exec()
    .then(function(emails) {
      if (err) {
        return res.statusCode(500);
      }
      
      return res.json({ emails });
    })
    .catch(function(err) {
      return res.statusCode(500);
    });
  });
};

let sendEmail = function(req, res) {
  return sendGrid(req)
  .then(function(response) {
    return addEmail(req, res);
  })
  .catch(function(err) {
    throw err;
  });
};

let addEmail = function(req, res) {
  if (
      !req.body.recipient ||
      !req.body.message ||
      !req.body.sender_first_name ||
      !req.body.sender_last_name ||
      !req.body.user_id
     ) {
    res.status(403).end();
    return;
  }

  let newEmail = new Email(req.body);

  // Let's sanitize inputs
  newEmail.recipient         = sanitizeHtml(newEmail.recipient);
  newEmail.message           = sanitizeHtml(newEmail.message);
  newEmail.sender_first_name = sanitizeHtml(newEmail.sender_first_name);
  newEmail.sender_last_name  = sanitizeHtml(newEmail.sender_last_name);
  newEmail.user_id           = sanitizeHtml(newEmail.user_id);

  newEmail.save((err, saved) => {
    if (err) {
      return res.status(500).send(err);
    }

    return res.json({ post: saved });
  });
};

module.exports = {
  getEmails: getEmails,
  sendEmail: sendEmail,
  addEmail : addEmail
};

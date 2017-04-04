'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const Email        = require('../models/Email.js'),
      sendGrid     = require('../../util/sendgrid.js'),
      sanitizeHtml = require('sanitize-html');

let getEmails = function(req, res) {
  Email.find().sort('-created_on').exec((err, emails) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ emails });
  });
};

let sendEmail = function(req, res) {
  sendGrid(req, res);
  addEmail(req, res);
};

let addEmail = function(req, res) {
  if (
      !req.body.email.recipient ||
      !req.body.email.message ||
      !req.body.email.sender_first_name ||
      !req.body.email.sender_last_name ||
      !req.body.email.user_id
     ) {
    res.status(403).end();
  }

  let newEmail = new Email(req.body.email);

  // Let's sanitize inputs
  newEmail.recipient         = sanitizeHtml(newEmail.recipient);
  newEmail.message           = sanitizeHtml(newEmail.message);
  newEmail.sender_first_name = sanitizeHtml(newEmail.sender_first_name);
  newEmail.sender_last_name  = sanitizeHtml(newEmail.sender_last_name);
  newEmail.user_id           = sanitizeHtml(newEmail.user_id);

  newEmail.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ post: saved });
  });
};

module.exports = {
  getEmails: getEmails,
  sendEmail: sendEmail,
  addEmail : addEmail
};

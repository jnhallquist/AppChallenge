'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const SendGrid = require('sendgrid')(require('../.secrets.json').sendgrid_key);

module.exports = function send(req) {
  let newEmail = SendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: req.body.recipient,
            },
          ],
          subject: `${req.body.sender_first_name} ${req.body.sender_last_name}`,
        },
      ],
      from: {
        email: 'test@test.com',
      },
      content: [
        {
          type: 'text/plain',
          value: req.body.message,
        },
      ],
    },
  });

  return SendGrid.API(newEmail);
};

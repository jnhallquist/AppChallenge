'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const SendGrid = require('sendgrid')(require('../.secrets.json').sendgrid_key);

module.exports = function send(req, res) {
  let newEmail = SendGrid.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: req.body.form.email,
            },
          ],
          subject: `${req.body.form.firstName} ${req.body.form.lastName}`,
        },
      ],
      from: {
        email: 'test@test.com',
      },
      content: [
        {
          type: 'text/plain',
          value: req.body.form.message,
        },
      ],
    },
  });

  return sg.API(newEmail)
  .then(response => {
    res.send(`Email sent to: ${req.body.form.email}`);
  })
  .catch(error => {
    res.status(500).send(error);
  });
};

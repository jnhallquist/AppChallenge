/* jslint node: true */
/* jshint esversion: 6 */
const EmailController = require('../controllers/Email.js');

module.exports = function(app) {
  app.get('/emails', EmailController.getEmails);
  app.post('/email', EmailController.addEmail);
};

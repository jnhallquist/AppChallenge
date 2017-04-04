/* jslint node: true */
/* jshint esversion: 6 */
const UserController = require('../controllers/User.js');

module.exports = function(app) {
  app.post('/login', UserController.login);
};

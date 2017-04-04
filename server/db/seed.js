'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const User = require('../models/User.js');

let user = new User(
             { email: 'test@test.com', password: 'test', created_on: Date.now() }
           );

module.exports = function() {
  User.remove({}, function(err, _) {
    user.save((err, saved) => {
      if (err) {
        throw `DB_SEED_ERR: ${err}`;
      }

      console.log('DB seeded');
    });
  })
}

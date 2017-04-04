/* jslint node: true */
/* jshint esversion: 6 */
const Mongoose = require('mongoose');

const emailSchema = new Mongoose.Schema({
  user_id          : { type: 'Number', required: true },
  recipient        : { type: 'String', required: true },
  message          : { type: 'String', require: true},
  sender_first_name: { type: 'String', require: true},
  sender_last_name : { type: 'String', require: true},
  created_on       : { type: 'Date', default: Date.now, required: true },
});

module.exports = Mongoose.model('Email', emailSchema);

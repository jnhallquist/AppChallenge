'use strict';
/* jslint node: true */
/* jshint esversion: 6 */
const express      = require('express'),
      app          = express(),
      path         = require('path'),
      bodyParser   = require('body-parser'),
      serverConfig = require('./config'),
      mongoose     = require('mongoose'),
      seed         = require('./db/seed.js');

mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

  seed();
});

app.use(express.static(path.join(__dirname, '..', 'dev')));
app.set('view engine', 'html');

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin');
  next();
});

app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ limit: '20mb', extended: false }));

require('./routes/email.routes')(app);
require('./routes/user.routes')(app);

app.listen(serverConfig.port, (error) => {
  if (!error) {
    console.log(`Running on port: ${serverConfig.port}`);
  }
});

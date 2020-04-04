require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();

require('./configs/db.config');

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup

app.use(express.static(path.join(__dirname, 'public')));

// Enable authentication using session + passport
app.use(session({
  secret: 'postman-example',
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

require('./passport')(app);

const index = require('./routes/index');
app.use('/api', index);


module.exports = app;

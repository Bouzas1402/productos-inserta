const express = require('express');
const cors = require('cors');
const passport = require('passport');

const config = require('./config/config');
require('./config/passport');
const routes = require('./routes');

const app = express();

// CORS configuration
app.use(
  cors({
    origin: config.CORS_ORIGIN,
    credentials: true
  })
);

// Body parsing middleware for all other routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize Passport middleware
app.use(passport.initialize());

// JWT Configuration
app.set('jwt.secret', config.JWT_SECRET);
app.set('jwt.issuer', config.JWT_ISSUER);
app.set('jwt.audience', config.JWT_AUDIENCE);

// API routes
app.use('/api', routes);

module.exports = app;

require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const authRouter = require('./authorization/auth-router');
const homeRouter = require('./home/home-router');
const usersRouter = require('./users/users-router');
const profileRouter = require('./profile/profile-router');
const createEventRouter = require('./create-events/create-event-router');

const app = express();

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';

// Standard Middleware
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

// Routes
app.use('/api/login', authRouter);
app.use('/api/create-account', usersRouter)
app.use('/api/home', homeRouter);
app.use('/api/profile', profileRouter);
app.use('/api/create-event', createEventRouter)
// Error Handler
app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        console.log(error)
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
});

module.exports = app
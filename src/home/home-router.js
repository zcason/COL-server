const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const HomeService = require('./home-service');

const homeRouter = express.Router();

homeRouter
    .route('/:begin_date/:end_date')
    .get(requireAuth, (req, res, next) => {
        const { begin_date, end_date } = req.params;
        const dates = { begin_date, end_date }
        HomeService.getUserEventsByMonth(req.app.get('db'), req.user.id, dates)
            .then(events => {
                res.json(events)
            })
            .catch(next)
    })

module.exports = homeRouter

const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const HomeService = require('./home-service')

const homeRouter = express.Router()

homeRouter
    .route('/')
    .all(requireAuth)
    .get((req, res, next) => {
        HomeService.getAllEventsWithUserEmail(req.app.get('db'))
            .then(events => {
                res.json(events)
            })
            .catch(next)
    })

module.exports = homeRouter

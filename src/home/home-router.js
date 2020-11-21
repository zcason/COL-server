const express = require('express')
const { requireAuth } = require('../middleware/jwt-auth')
const HomeService = require('./home-service')

const homeRouter = express.Router()

homeRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {

        HomeService.getAllEventsWithUserId(req.app.get('db'), req.user.id)
            .then(events => {
                res.json(events)
            })
            .catch(next)
    })

module.exports = homeRouter

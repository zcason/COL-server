const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const CreateEventService = require('./create-event-service');


const createEventRouter = express.Router();
const jsonBodyParser = express.json();

createEventRouter
    .route('/')
    .post(requireAuth, jsonBodyParser, (req, res, next) => {
        const { title, event_desc, event_date } = req.body;
        const newEvent = {
            title,
            event_desc,
            event_date,
            user_id: req.user.id
        };

        for (const field of ['title', 'event_date'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })

        CreateEventService.postNewEvent(req.app.get('db'), newEvent)
            .then(event => {
                res
                    .status(201)
                    .json(CreateEventService.serializeEvent(event))
            })
            .catch(next)



    })

module.exports = createEventRouter;

const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const ProfileService = require('./profile-service');

const profileRouter = express.Router();
const jsonBodyParser = express.json();


profileRouter
    .route('/')
    .get(requireAuth, (req, res, next) => {
        ProfileService.getProfile(req.app.get('db'), req.user.id)
            .then(userInfo => {
                res.json(userInfo)
            })
            .catch(next)
    })
    .delete(requireAuth, (req, res, next) => {
        ProfileService.deleteProfile(req.app.get('db'), req.user.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    // phone number services
    .post(requireAuth, jsonBodyParser, (req,res, next) => {
        const {users_number} = req.body;
        const newPhoneNumber = {
            users_number: parseInt(users_number),
            user_id: req.user.id
        };

        if (!req.body['users_number'])
                return res.status(400).json({
                    error: `Missing phone number in request body`
                })
        
        ProfileService.postPhoneNumber(req.app.get('db'), newPhoneNumber)
        .then(phoneNumber => {
            res
                .status(201)
                .json(ProfileService.serializePhoneNumber(phoneNumber))
        })
        .catch(next)
    })

module.exports = profileRouter;

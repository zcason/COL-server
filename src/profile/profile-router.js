const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const ProfileService = require('./profile-service');

const profileRouter = express.Router();

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

module.exports = profileRouter;

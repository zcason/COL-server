const { json } = require('express');
const express = require('express');
const { requireAuth } = require('../middleware/jwt-auth');
const ProfileService = require('./profile-service');

const profileRouter = express.Router();
const jsonBodyParser = express.json();


profileRouter
    .route('/')
    .get(requireAuth, async (req, res, next) => {
        const {userHasNumber,getProfile, getProfileWithNumber} = ProfileService;

        // checks if the users has a phone number
        const userNumDoesExist = async () => {
            const res = await userHasNumber(req.app.get('db'), req.user.id);
            const doesExist = res.rows[0].exists;

            return doesExist;
        }
        
        // sets 'hasNumber' to true or false after promise is resolved 
        const hasNumber = await userNumDoesExist();
        

        // if user has a number send profile info with number else send regular profile info
        if (hasNumber) {
            getProfileWithNumber(req.app.get('db'), req.user.id)
            .then(userInfo => {
                res.json(userInfo)
            })
            .catch(next)
        
        } else {
            getProfile(req.app.get('db'), req.user.id)
                .then(userInfo => {
                    res.json(userInfo)
                })
                .catch(next)
            }    
    })
    // delete account service
    .delete(requireAuth, (req, res, next) => {
        ProfileService.deleteProfile(req.app.get('db'), req.user.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })
    // phone number service
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
    });

    profileRouter
    .route('/number')
    // deletes users phone number
    .delete(requireAuth, (req, res, next) => {
        const { id } = req.params;
        ProfileService.deletePhoneNumber(req.app.get('db'), req.user.id)
            .then(() => {
                res.status(204).end()
            })
            .catch(next)

    });

module.exports = profileRouter;

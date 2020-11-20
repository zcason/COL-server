const { compare } = require('bcryptjs');
const express = require('express');
const app = require('../app');
const authService = require('./auth-service');

const authRouter = express.Router();
const jsonBodyParser = express.json();

authRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { email, password } = req.body;
        const loginUser = { email, password };

        for (const [key, value] of Object.entries(loginUser))
            if (value == null)
                return res.status(400).json({
                    error: `Missing '${key}' in request body`
                });

        authService.getUserWithEmail(req.app.get('db'), loginUser.email)
            .then(dbUser => {
                if (!dbUser) {
                    return res.status(400)
                        .json({ error: 'Incorrect email or password' });
                }
                return authService.comparePasswords(loginUser.password, dbUser.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400)
                                .json({ error: 'Incorrect  email or password' });
                        }
                        const sub = dbUser.email;
                        const payload = { user_id: dbUser.id };


                        res.send({ authToken: authService.createJwt(sub, payload) });
                    });
            })
            .catch(next);
    });

module.exports = authRouter;
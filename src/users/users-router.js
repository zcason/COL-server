const express = require('express');
const UsersService = require('./users-service');
const path = require('path');



const usersRouter = express.Router();
const jsonBodyParser = express.json();

usersRouter
    .post('/', jsonBodyParser, (req, res, next) => {
        const { password, email, full_name } = req.body
        const passwordError = UsersService.validatePassword(password);
        const emailError = UsersService.validateEmail(email);

        for (const field of ['full_name', 'email', 'password'])
            if (!req.body[field])
                return res.status(400).json({
                    error: `Missing '${field}' in request body`
                })


        if (passwordError) {
            return res.status(400).json({ error: passwordError })
        }

        if (emailError) {
            return res.status(400).json({ error: emailError })
        }


        UsersService.hasUserWithEmail(
            req.app.get('db'),
            email
        )
            .then(hasUserWithEmail => {
                if (hasUserWithEmail) {
                    return res.status(400).json({ error: `Email already taken` })
                }

                return UsersService.hashPassword(password)
                    .then(hashedPassword => {
                        const newUser = {
                            full_name,
                            email,
                            password: hashedPassword
                        }

                        return UsersService.insertUser(
                            req.app.get('db'),
                            newUser
                        )
                            .then(user => {
                                res
                                    .status(201)
                                    .location(path.posix.join(req.originalUrl, `/${user.id}`))
                                    .json(UsersService.serializeUser(user))
                            })
                    })
            })
            .catch(next)
    })
module.exports = usersRouter;
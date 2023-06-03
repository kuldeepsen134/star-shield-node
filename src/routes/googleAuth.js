const express = require('express')
const router = express.Router()
const passport = require('passport')

module.exports = app => {

    router.get('/google', (req, res, next) => {

        // req.session.google_oauth2_state = Math.random().toString(36).substring(2);

        next();
    },
        passport.authenticate('google', {
            scope: ['email', 'profile'],
            prompt: 'select_account',
            state: true,
        })
    )

    router.get('/auth/callback',
        passport.authenticate('google', {
            successRedirect: '/api/dashboard',
            failureRedirect: '/api/login'
        }))



    app.use('/api', router)
}
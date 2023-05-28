const passport = require('passport')
const md5 = require("md5")
const { User } = require('../models')
const GoogleStragy = require('passport-google-oauth2').Strategy

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})

passport.use(new GoogleStragy({
    accessType: 'offline',
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "http://localhost:5200/auth/callback",
    passReqToCallback: true,
    prompt: 'select_account'
},
    function (request, accessToken, refreshToken, profile, done) {

        console.log('profile>>>>>>>>', profile);

        User.findOne({ googleId: profile.id })
            .then(existingUser => {

                if (existingUser) {
                    done(null, existingUser);
                }
                else {
                    new User({
                        googleId: profile.id,
                        email: profile.email,
                        name: profile.displayName,
                        password: md5(profile.family_name)
                    }).save()
                        .then(user => done(null, user))
                }
            })
    }

))

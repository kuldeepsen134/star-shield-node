const GoogleStrategy = require('passport-google-oauth2').Strategy;
const md5 = require("md5");
const { User } = require('../models');
const passport = require('passport');

passport.use(
    new GoogleStrategy(
        {
            accessType: 'offline',
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: "https://star-shield-node.vercel.app/api/auth/callback",
            passReqToCallback: true,
            prompt: 'select_account',
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                const existingUser = await User.findOne({ googleId: profile.id });

                if (existingUser) {
                    return done(null, existingUser);
                } else {
                    const newUser = new User({
                        googleId: profile.id,
                        email: profile.email,
                        name: profile.displayName,
                        isEmailVerified: true,
                        password: md5(profile.family_name),
                    });

                    await newUser.save();

                    request.session.regenerate(function (err) {
                        if (err) {
                            return done(err);
                        }

                        done(null, newUser);
                    });
                }
            } catch (error) {
                return done(error);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (error) {
        done(error);
    }
});
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const md5 = require("md5");
const { User } = require('../models');
const passport = require('passport');
const jwt = require('jsonwebtoken')

// passport.use(
//     new GoogleStrategy(
//         {
//             accessType: 'offline',
//             clientID: process.env.clientID,
//             clientSecret: process.env.clientSecret,
//             callbackURL: "http://localhost:5200/api/auth/callback",
//             passReqToCallback: true,
//             prompt: 'select_account',
//         },
//         async function (request, accessToken, refreshToken, profile, done,) {
//             try {
//                 const existingUser = await User.findOne({ googleId: profile.id });

//                 const userWithSameEmail = await User.findOne({ email: profile.email });

//                 if (existingUser) {
//                     done(null, existingUser);
//                     return
//                 } else
//                     // Check if the email already exists in the collection
//                     if (userWithSameEmail) {
//                         // Handle the case where a user with the same email already exists
//                         const token = await jwt.sign({
//                             _id: userWithSameEmail._id,
//                             email: userWithSameEmail.email,
//                             first_name: userWithSameEmail.first_name,
//                             last_name: userWithSameEmail.last_name
//                         }, process.env.JWT_SECRET, { expiresIn: `${process.env.JWT_EXPIRE_ACCESS}` })

//                         res.cookie('token', token).send({
//                             token: token,
//                             message: 'LoggedIn Successfully',
//                             error: false
//                         })

//                         done(null, userWithSameEmail);
//                         return;
//                     }
//                     else {
//                         const newUser = new User({
//                             googleId: profile.id,
//                             email: profile.email,
//                             name: profile.displayName,
//                             isEmailVerified: profile.email_verified,
//                             password: md5(profile.family_name),
//                         });

//                         await newUser.save();

//                         request.session.regenerate(function (err) {
//                             if (err) {
//                                 return done(err);
//                             }
//                             done(null, newUser);
//                         });
//                     }
//             } catch (error) {

//                 console.log('error>>>>>>>>>', error);

//                 return done(error);
//             }
//         }
//     )
// );
passport.use(
    new GoogleStrategy(
        {
            accessType: 'offline',
            clientID: process.env.clientID,
            clientSecret: process.env.clientSecret,
            callbackURL: "http://localhost:5200/api/auth/callback",
            passReqToCallback: true,
            prompt: 'select_account',
        },
        async function (request, accessToken, refreshToken, profile, done) {
            try {
                // console.log('>>>>profile>>>>',profile);
                const existingUser = await User.findOne({ googleId: profile.id });
                const userWithSameEmail = await User.findOne({ email: profile.email });

                if (existingUser) {
                    const token = jwt.sign(
                        {
                            _id: existingUser._id,
                            email: existingUser.email,
                            first_name: existingUser.given_name,
                            last_name: existingUser.last_name,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRE_ACCESS }
                    );

                    // Set the token in the response cookie
                    request.res.cookie('token', token);

                    done(null, existingUser);
                    return;
                    return;
                } else if (userWithSameEmail) {
                    // Generate a JWT token for the user
                    const token = jwt.sign(
                        {
                            _id: userWithSameEmail._id,
                            email: userWithSameEmail.email,
                            first_name: userWithSameEmail.given_name,
                            last_name: userWithSameEmail.last_name,
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: process.env.JWT_EXPIRE_ACCESS }
                    );

                    // Set the token in the response cookie
                    request.res.cookie('token', token);

                    done(null, userWithSameEmail);
                    return;
                } else {
                    const newUser = new User({
                        googleId: profile.id,
                        email: profile.email,
                        first_name: profile.displayName,
                        isEmailVerified: profile.email_verified,
                        password: md5(profile.family_name),
                    });

                    await newUser.save();

                    request.session.regenerate(function (err) {
                        if (err) {
                            return done(err);
                        }
                        done(null, newUser);
                        // request.res.status(200).send({
                        //     message: 'User registered successfully',
                        //     error: false
                        //   });
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
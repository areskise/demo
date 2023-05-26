const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
require('dotenv').config();

const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;

passport.use(
    new GoogleStrategy (
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: 'auth/google/callback',
            scope: ['profile', 'email']
        },
        function(accessToken, refreshToken, profile, callback) {
            callback(null,profile);
        }
    )
)

passport.serializeUser((user, done) => {
    done(null,user);
})

passport.deserializeUser((user, done) => {
    done(null,user);
})
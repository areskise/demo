const jwt = require('jsonwebtoken');
const {google} = require("googleapis");
const {OAuth2Client} = require('google-auth-library');
const { app, firestore } = require("../firebaseConfig");
require('dotenv').config();

const CLIENT_ID=process.env.CLIENT_ID;
const CLIENT_SECRET=process.env.CLIENT_SECRET;
const REDIRECT_URI=process.env.REDIRECT_URI;

const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const authGoogle = async(req, res, next) => {
    try {
        const googleIdToken = req.body.googleIdToken
        const ticket = await oAuth2Client.verifyIdToken({
            idToken: googleIdToken,
        })
        const payload = ticket.getPayload();
        const email = payload.email;
        console.log(payload);
        if(email) {
            const token = jwt.sign(
                {googleIdToken},
                'secret',
                { expiresIn: '1d' }
            );
            res.cookie('token', token, {
                maxAge: 86400000,
            })
            res.cookie('email', email, {
                maxAge: 86400000,
            })
            res.status(200).json('Logged in successfully');
        } else {
            res.status(401).json('Not authenticated!');
        }    
    } catch (error) {
        res.status(401).json('Not authenticated!');
    }
}

const authVerify = (req, res, next) => {
    res.status(200).json('Verify');
}


module.exports = {
    authGoogle,
    authVerify
}
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const passportSetup = require('./passport');
const authRoute = require('./routes/auth');
const cookieSession = require('cookie-session');

const app = express();

app.use(express.json());
app.use(cookieSession({
    name: 'session',
    keys: ['keys'],
    maxAge: 24*60*60*100,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({ 
    origin: "http://localhost:3000", 
    methods: 'GET,PUT,POST,DELETE',
    credentials: true 
}));

app.use('/auth', authRoute)

app.listen(5000, () => { 
    console.log('Server is running on port 5000');
});
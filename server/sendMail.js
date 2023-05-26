// const {google} = require("googleapis");
// const nodemailer = require("nodemailer");
// require('dotenv').config();

// const CLIENT_ID=process.env.CLIENT_ID;
// const CLIENT_SECRET=process.env.CLIENT_SECRET;
// const REDIRECT_URI=process.env.REDIRECT_URI;
// const REFRESH_TOKEN=process.env.REFRESH_TOKEN;
// const SERVICE=process.env.SERVICE;
// const TYPE_AUTH=process.env.TYPE_AUTH;
// const USER=process.env.USER;

// const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
// oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

// const sendMail = async(email, subject, text) => {
//     try {
//         const accessToken = await oAuth2Client.getAccessToken();
//         const transporter = nodemailer.createTransport({
//             service: SERVICE,
//             auth: {
//                 type: TYPE_AUTH,
//                 user: USER,
//                 clientId: CLIENT_ID,
//                 clientSecret: CLIENT_SECRET,
//                 refreshToken: REFRESH_TOKEN,
//                 accessToken: accessToken
//             }
//         });
//         // send mail with defined transport object
//         let info = await transporter.sendMail({
//             from: USER, // sender address
//             to: email   , // list of receivers
//             subject: subject, // Subject line
//             text: text, // plain text body
//             // html: "<b>Hello world?</b>", // html body
//         });
//     } catch (error) {
//         console.error(error);
//     }
// }

// module.exports = sendMail;
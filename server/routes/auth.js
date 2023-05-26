const router = require('express').Router();
const passport = require('passport');
const REDIRECT_URI=process.env.REDIRECT_URI;
const authController = require('../controllers/auth');
const { verifyToken } = require('../middlewares/verifyToken');

router.post("/google", authController.authGoogle)

router.get("/verify", verifyToken, authController.authVerify)

// router.get("/google", passport.authenticate('google',['profile', 'email']));

// router.get("/login/success", authController.authGoogle)

// router.get("/login/failed", (req,res,next) => {
//     res.status(401).json({
//         error: true,
//         message: "Login failure",
//     })
// })

// router.get("/google/callback", passport.authenticate('google',{
//     successRedirect: REDIRECT_URI,
//     failureRedirect: 'login/failed',
// }))

// router.get("/logout", (req, res, next) => {
//     req.logout()
//     res.redirect(process.env.REDIRECT_URI)
// })

module.exports = router;
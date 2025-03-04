const { register,login, sendForgotPasswordEmailLink, forgotPassword, sendResetPasswordMail, resetPassword } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

const router = require('express').Router()

router.post('/register', register)
router.post('/login', login)
// router.post('/sendForgotPasswordEmailLink',sendForgotPasswordEmailLink)
// console.log("invoked")
router.post("/forgot-password", forgotPassword)
router.get("/reset-password/:id/:token",sendResetPasswordMail)
router.post("/reset-password/:id/:token", resetPassword)
// router.get("/reset-password", sendResetPasswordMail)


module.exports = router;
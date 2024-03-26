const express = require('express')
const router = express.Router()


const { signup, signin, signout, verifyEmail } = require('../controllers/authController')



router.post('/signup',signup)
router.post('/signin',signin)
router.get('/signout', signout)
router.get('/email/verify/:token',verifyEmail)

module.exports = router
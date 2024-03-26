const express = require('express')
const router = express.Router()



const { getMyAccount, addAboutMe } = require('../controllers/accountController')
const { requireSignIn } = require('../middlewares/auth')



router.get('/account',[requireSignIn],getMyAccount)



module.exports = router
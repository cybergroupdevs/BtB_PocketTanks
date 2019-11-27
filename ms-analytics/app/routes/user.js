const express = require('express')
const bcrypt = require('bcrypt')

const users = require('../controllers/api/user')

const router = express.Router()
require('../db/mongoose');

// methods={
//     get:get,
//     post:post,
//     put:put

// }






router.post('/registration', users['registration'])
router.get('/login', users['login'])

router.put('/send', users['sendEmail'] )


router.put('/forgotpassword', users['forgotPassword'])
router.put('/changepassword', users['changePassword'])
router.get('/emailverification', users['emailVerification'])
router.put('/forgotpasswordchange', users['forgotPasswordChanged'])


module.exports = router;
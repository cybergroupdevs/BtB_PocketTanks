const express = require('express')
const bcrypt = require('bcrypt')

const users = require('../controllers/api/user')

const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")

require('../db/mongoose');


router.post('/registration', users['registration'])
router.post('/login', users['login'])


module.exports = router;
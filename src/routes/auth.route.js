const express = require('express')
// const bodyParser = require('body-parser')

const { authentication, loginController, registerEmail, registerCredentials, logout, getUser, check } = require('../controllers/auth.controller')

const authRouter = express.Router()
// authRouter.use(bodyParser.json())

authRouter.post('/login', loginController)

authRouter.post('/email-register', registerEmail)

authRouter.post('/register', authentication, registerCredentials)


authRouter.get('/logout', authentication, logout)

module.exports = authRouter

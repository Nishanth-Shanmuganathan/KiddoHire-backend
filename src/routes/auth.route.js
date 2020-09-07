const express = require('express')
// const bodyParser = require('body-parser')

const { authentication, loginController, registerEmail, verifyEmail, logout } = require('../controllers/auth.controller')

const authRouter = express.Router()
// authRouter.use(bodyParser.json())

authRouter.post('/login', loginController)

authRouter.post('/register', registerEmail)

authRouter.get('/email/:key', authentication, verifyEmail)


// authRouter.post('/register', authentication, registerCredentials)


authRouter.get('/logout', authentication, logout)

module.exports = authRouter

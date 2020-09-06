const express = require('express')

const { fetchProfile, saveProfile } = require('./../controllers/profile.controller')

const profileRouter = express.Router()


profileRouter.get('/:profileName', fetchProfile)

profileRouter.patch('/:profileName', saveProfile)

module.exports = profileRouter

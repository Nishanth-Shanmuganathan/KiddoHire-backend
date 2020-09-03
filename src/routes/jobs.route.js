const express = require('express')
// const bodyParser = require('body-parser')

const { searchCity } = require('./../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/city/:city', searchCity)

// jobRouter.post('/feeds', feedBuilder)

module.exports = jobRouter

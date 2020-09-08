const express = require('express')
// const bodyParser = require('body-parser')

const { searchCity, addJob } = require('./../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/city/:city', searchCity)

jobRouter.post('/job', addJob)

module.exports = jobRouter

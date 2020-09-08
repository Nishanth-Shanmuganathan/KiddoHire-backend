const express = require('express')
// const bodyParser = require('body-parser')

const { searchCity, addJob, fetchJobs } = require('./../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/city/:city', searchCity)

jobRouter.get('/jobs', fetchJobs)

jobRouter.post('/job', addJob)

module.exports = jobRouter

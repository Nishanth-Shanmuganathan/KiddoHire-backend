const express = require('express')
// const bodyParser = require('body-parser')

const { searchCity, addJob, fetchJobs, fetchAppliedJobs, applyJob, generateReport, rejectApplicant } = require('./../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/city/:city', searchCity)

jobRouter.get('/jobs', fetchJobs)

jobRouter.get('/jobs-applied', fetchAppliedJobs)

jobRouter.get('/generate-report/:jobId', generateReport)

jobRouter.get('/job/:jobId', applyJob, fetchJobs)

jobRouter.post('/job', addJob)

jobRouter.get('/reject/:jobId/:userId', rejectApplicant)

jobRouter.get('/shortlist/:jobId/userId', applyJob)

module.exports = jobRouter

const express = require('express')
// const bodyParser = require('body-parser')

const { searchCity, addJob, fetchJobs, fetchAppliedJobs, applyJob, generateReport, rejectApplicant, editingJob, shortlistApplicant } = require('./../controllers/jobs.controller')

const jobRouter = express.Router()

jobRouter.get('/city/:city', searchCity)

jobRouter.get('/jobs', fetchJobs)

jobRouter.get('/jobs-applied', fetchAppliedJobs)

jobRouter.get('/generate-report/:jobId', generateReport)

jobRouter.get('/job/:jobId', applyJob, fetchJobs)

jobRouter.post('/job', addJob)

jobRouter.post('/edit/:jobId', editingJob)

jobRouter.get('/reject/:jobId/:userId/:round', rejectApplicant)

jobRouter.get('/shortlist/:jobId/:userId/:round', shortlistApplicant)

module.exports = jobRouter

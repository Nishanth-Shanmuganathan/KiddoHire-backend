const express = require('express')
const { imageFetch, resumeFetch, certificateFetch } = require('./../controllers/public.controller')

const publicRouter = express.Router()

publicRouter.get('/:id/image', imageFetch)

publicRouter.get('/:id/resume', resumeFetch)

publicRouter.get('/:id/certificate/:certificateId', certificateFetch)


module.exports = publicRouter

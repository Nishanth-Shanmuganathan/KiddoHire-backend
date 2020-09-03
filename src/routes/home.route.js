const express = require('express')
// const bodyParser = require('body-parser')

const { dashboardBuilder, feedBuilder } = require('./../controllers/home.controller')

const homeRouter = express.Router()

homeRouter.get('/statistics', dashboardBuilder)

homeRouter.post('/feeds', feedBuilder)

module.exports = homeRouter

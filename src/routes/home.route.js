const express = require('express')
// const bodyParser = require('body-parser')

const { dashboardBuilder } = require('./../controllers/home.controller')

const homeRouter = express.Router()

homeRouter.get('/statistics', dashboardBuilder)

homeRouter.get('/feeds', dashboardBuilder)

module.exports = homeRouter

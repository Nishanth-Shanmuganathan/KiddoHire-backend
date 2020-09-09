const express = require('express')

const { fetchConnection, fetchMyConnection, addConnection, removeConnection } = require('./../controllers/follows.controller')

const followsRouter = express.Router()

followsRouter.get('/connections', fetchConnection)

followsRouter.get('/my-connections', fetchMyConnection)

followsRouter.get('/follow/:userName', addConnection)

followsRouter.get('/un-follow/:userName', removeConnection)

module.exports = followsRouter

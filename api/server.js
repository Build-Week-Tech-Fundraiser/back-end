const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const restrict = require('../middlewares/restricted')

//middleware
const restrict = require('../middlewares/restricted')

const usersRouter = require('./users/users-router')
const projectsRouter = require('./projects/projects-router')

const server = express()

server.use(express.json())
server.use(cors())
server.use(helmet())

server.use('/api/projects', restrict, projectsRouter)
server.use('/api/users', usersRouter)

server.get('/', (req, res) => {
    res.status(200).json({api:'UP'})
})

module.exports = server
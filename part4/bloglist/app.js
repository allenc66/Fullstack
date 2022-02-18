const express = require('express') //call express
const app = express() // define our app using express
//const morgan = require('morgan') // used to see requests
const cors = require('cors')
const mongoose = require('mongoose')// for working with database
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')


logger.info('connecting to', config.MONGODB_URL)

mongoose.connect(config.MONGODB_URL)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.static('build'))
app.use(express.json())
//app.use(morgan(':method :url :status :res[content-name] :response-time ms'))
app.use(cors())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app


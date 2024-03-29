const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const requestLogger = (request, response, next) => {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    next()
  }
  
  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  const errorHandler = (error, request, response, next) => {
    logger.error(error.message)
  
    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
    } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
        error: 'invalid token'
      })
    } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
  }

  const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
      authorization && authorization.toLowerCase().startsWith('bearer ')
          ? (request.token = authorization.substring(7))
          : (request.token = null)
               
    next()
  }

  const userExtractor = async (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)
      if (decodedToken) {
        request.user = await User.findById(decodedToken.id)
      }
    }
   /* const authorization = await request.get('authorization')
    const decodedToken = jwt.verify( authorization.substring(7), process.env.SECRET)
    const user = await User.findById(decodedToken.id)
    
    authorization && authorization.toLowerCase().startsWith('bearer ')
    ? (request.user = user)
    : (request.user = null)*/ //(the above part is not working) Because "authorization" value could be null，jwt.verify (null) causing app crash

    next()

  }
  
  module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    tokenExtractor,
    userExtractor
  }
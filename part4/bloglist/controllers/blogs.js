const blogsRouter = require('express').Router()
const {Blog} = require('../models/blog')

blogsRouter.get('/', (request, response) => {

  Blog.find({}).then(blogs => {
        response.json(blogs)
      })
    })

blogsRouter.post('/', (request, response, next) => {
        const body = new Blog(request.body)
          if(body.title === undefined){
            return response.status(400).send({
              error: 'title is missing'
            })
          }
          else if(body.author === undefined){
            return response.status(400).send({
              error: 'author is missing'
            })
          }
          else if(body.url === undefined){
            return response.status(400).send({
              error: 'url is missing'
            })
          }
          else{
            const blog = new Blog({
              title: body.title,
              author: body.author,
              url: body.url,
              likes: body.likes
            })
          
            blog.save()
            .then(savedBlog => savedBlog.toJSON())
            .then(savedAndFormattedBlog => {
            response.status(201).json(savedAndFormattedBlog)
            })
            .catch (error => next(error))
          
        }
        
      })

module.exports = blogsRouter
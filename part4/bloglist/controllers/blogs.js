const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware")

blogsRouter.get('/', async (request, response) => {

    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
        response.json(blogs)
    })

blogsRouter.get('/:id', (request, response) => {
      Blog.findById(request.params.id)
        .then(blog => {
          if (blog) {
            response.json(blog)
          } else {
                
                  response.status(404).end()
                } 
              })
          })
           
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
        const body = request.body
        const user = request.user
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token ||!decodedToken.id){
          return response.status(401).json({error: 'token missing or invalid'})
        }
         /* if(body.title === undefined){
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
          }*/
          else{
            const blog = new Blog({
              title: body.title,
              author: body.author,
              url: body.url,
              likes: body.likes,
              user: user.id
            })
        const savedBlog = await blog.save()
        //console.log(savedBlog)
        //console.log(user)
        user.blogs = user.blogs.concat(savedBlog.id)
        await user.save()

       const populatedBlog = await savedBlog.populate('user', { username: 1, name: 1 }).execPopulate()

        response.status(200).json(populatedBlog.toJSON())
        }
      })

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
        const blog = await Blog.findByIdAndRemove(request.params.id)
        const user = request.user
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        if(! request.token || !decodedToken.id){
          return response.status(401).json({error:'token is missing or invalid'})
        }
        else if(blog.user.toString() === user.id.toString()){
          await Blog.findByIdAndRemove(request.params.id)
          response.status(204).end()
        }
        else{
          return response.status(401).json({error:'cannot process deletion'})
        }
          
        })

blogsRouter.put('/:id', async (request, response) => {
          const body = request.body
          const blog = {
            title: body.title,
            author:body.author,
            url: body.url,
            likes: body.likes
          }
         await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
            .then(updatedBlog => {
              response.json(updatedBlog)
            })   
        })


module.exports = blogsRouter
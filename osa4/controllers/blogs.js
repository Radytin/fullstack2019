const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  })

  const getTokenFrom = request => {  
    const authorization = request.get('authorization')  
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {    
      return authorization.substring(7)  
    }
    return null
  }  
  
  blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const token = getTokenFrom(request)
  
    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid' })
      }
  
      const user = await User.findById(decodedToken.id)
  
      var blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes = body.likes === undefined ? 0 : body.likes,
        user: user.id
      })
  
      try {
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())
      } catch (exception) {
        next(exception)
      }
  
    } catch (exception) {
      next(exception)
    }
  })
  

  blogsRouter.delete('/:id', async (request, response, next) => {
    try {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } catch (exception) {
      next(exception)
    }
  })



module.exports = blogsRouter
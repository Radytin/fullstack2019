const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({}).populate('user', { username: 1, name: 1 })
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
  const user = await User.findById(body.userId)
  const blog = new Blog({
    title:body.title,
    url:body.url,
    likes:body.likes,
    user: user._id

  })
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()    
    response.json(savedBlog.toJSON())
  } catch(exception) {
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
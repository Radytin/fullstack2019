const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

  
  beforeEach(async () => {
    await Note.deleteMany({})
  
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
  
    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()
  })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})

test('there are correct number of blogs', async () => {
    const response = await api.get('/api/blog')
  
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  
  test('the first blog is about', async () => {
    const response = await api.get('/api/blog')
  
    expect(response.body[0].title).toBe('React patterns')
  })

test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Cat blog',
      author: 'Catluver93',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blog')
    expect(response.length).toBe(helper.initialBlogs.length + 1)

  })
const mongoose = require('mongoose')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const {Blog} = require('../models/blog') //{Blog} is needed, not Blog, it has to be an object


beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => { //exe 4.8
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 50000)

test('check unique blog ID', async () => { //exe 4.9
    const response = await api.get('/api/blogs')
    const result = response.body.map(r => r.id)
  
    expect(result).toBeDefined()
  })

  test('a valid blog can be added ', async () => { //exe 4.10
    const newBlog = {
      "title": "First class tests",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      "likes": 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  
    const title = blogsAtEnd.map(n => n.title)
    expect(title).toContain(
      'First class tests'
    )
  })
  
test('the blog list has likes', async () => { //exe 4.11
  const newBlogNoLikes = {
    "title": "TDD harms architecture",
    "author": "Robert C. Martin",
    "url": "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
  }
    const res = await api
      .post('/api/blogs')
      .send(newBlogNoLikes)

      expect(res.body.likes).toBe(0)
  })

test('blog without title and url is returned to 400 status code', async () => { //exe 4.12
    const newBlog = {
      "author": "Robert C. Martin",
      "likes": 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

describe('deletion of a blog', () => { //exe 4.13
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    const contents = blogsAtEnd.map(r => r.title)

    expect(contents).not.toContain(blogToDelete.title)
  })
})

describe('updating the information of an individual blog post', () => {
  test("updated blog", async () => {
    const newBlog = {
      "title": "Type wars",
      "author": "Robert C. Martin",
      "url": "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      "likes": 2
    }

    const initialBlogs = await helper.blogsInDb()
    const blogToUpdate = initialBlogs[0]

    await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(newBlog)
    .expect(200)

    const blogAfterUpdate = await helper.blogsInDb()
    const updatedBlog = blogAfterUpdate[0]

    expect(blogAfterUpdate).toHaveLength(helper.initialBlogs.length)
    expect(updatedBlog.title).toBe("Type wars")
  })
})    

afterAll(() => {
  mongoose.connection.close()
})
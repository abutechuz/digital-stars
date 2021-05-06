const blogsModel = require('../models/blog.js')
const authJWT = require('../Library/function/auth.js')
const auth = require('../Library/function/auth.js')

module.exports = {
  GET: async (req, res) => {
    try {
      authJWT(req)
      const blogs = await blogsModel.getBlogs(req)

      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  },
  POST: async (req, res) => {
    try {
      authJWT(req)
      const blogs = await blogsModel.insertBlog(req)

      res.send(blogs)
    } catch (error) {
      console.log(error)
      res.sendStatus(403)
    }
  },
  PUT: async (req, res) => {
    try {
      authJWT(req)
      const returning = await blogsModel.setBlog(req)

      res.send(returning)
    } catch (error) {
      res.sendStatus(403)
    }
  },
  DELETE: async (req, res) => {
    try {
      authJWT(req)
      const blog = await blogsModel.deleteBlog(req)

      res.send(blog)
    } catch (error) {
      res.sendStatus(403)
    }
  },
}

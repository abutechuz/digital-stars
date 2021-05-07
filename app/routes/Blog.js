const router = require('express').Router()
const Blog = require('../controllers/blog.js')

router
  .route('/')
  .get(Blog.GET)
  .post(Blog.POST)
  .put(Blog.PUT)
  .delete(Blog.DELETE)




module.exports = router

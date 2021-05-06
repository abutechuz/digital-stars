const router = require('express').Router()
const Blog = require('../controllers/Blog.js')

router
  .route('/')
  .get(Blog)

module.exports = router

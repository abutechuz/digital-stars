const router = require('express').Router()
const Like = require('../controllers/like.js')

router
  .route('/')
  .post(Like.POST)
  .delete(Like.DELETE)


module.exports = router

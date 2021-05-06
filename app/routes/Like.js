const router = require('express').Router()
const Like = require('../controllers/Like.js')

router
  .route('/')
  .post(Like.POST)
  .delete(Like.DELETE)




module.exports = router

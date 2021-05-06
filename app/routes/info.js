const router = require('express').Router()
const Info = require('../controllers/info.js')

router
  .route('/')
  .get(Info.GET)
  .post(Info.POST)
  // .put(Blog.PUT)
  // .delete(Blog.DELETE)




module.exports = router

const router = require('express').Router()
const Blog = require('../controllers/blog.js')

router.get("/",Blog.GET)
  .get("/getuser",Blog.GETBYID)
  .post("/",Blog.POST)
  .put("/",Blog.PUT)
  .delete("/",Blog.DELETE)




module.exports = router

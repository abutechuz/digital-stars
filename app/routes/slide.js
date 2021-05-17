const router = require('express').Router()
const Slide = require('../controllers/slide.js')

router
.get("/",Slide.GET)
.post("/",Slide.POST)
.delete("/",Slide.DELETE)

module.exports = router

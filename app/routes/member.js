const router = require('express').Router()
const Member = require('../controllers/member.js')

router
.get("/",Member.GET)
.post("/",Member.POST)
.delete("/",Member.DELETE)

module.exports = router

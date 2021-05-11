const router = require('express').Router()
const Info = require('../controllers/info.js')

router
  .route('/')
  .get(Info.GET)
  .post(Info.POST)

module.exports = router

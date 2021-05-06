const router = require('express').Router()
const Home = require('../controllers/Home.js')

router
  .route('/')
  .get(Home)

module.exports = router

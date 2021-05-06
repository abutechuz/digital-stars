const router = require('express').Router()
const login = require('../controllers/login.js')

router
  .route('/')
  .post(login)

module.exports = router

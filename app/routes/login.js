const router = require('express').Router()
const {login ,check} = require('../controllers/login.js')

router
  .route('/')
  .post(login)
  .get(check)


module.exports = router

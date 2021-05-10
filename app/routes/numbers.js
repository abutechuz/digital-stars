const router = require('express').Router()
const Numbers = require('../controllers/numbers.js')

router
  .route('/')
  .get(Numbers.GET)
  .post(Numbers.POST)




module.exports = router

const router = require('express').Router()
const Numbers = require('../controllers/numbers.js')

router
  // .get('/',Numbers.GET)
  .post('/',Numbers.POST)
  .get('/',Numbers.GET_FORMS)


module.exports = router

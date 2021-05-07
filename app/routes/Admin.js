const router = require('express').Router()
const admins = require('../controllers/Admin.js')

router
    .route('/')
    .get(admins.GET)
    .post(admins.POST)
    .put(admins.PUT)
    .delete(admins.DELETE)

module.exports = router
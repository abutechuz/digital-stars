const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// PAGES
const Home = require('./routes/Home.js')

// ENDPOINTS
app.use('/', Home)


module.exports = app

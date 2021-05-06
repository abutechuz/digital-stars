const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// PAGES
const Blog = require('./routes/Blog.js')

// ENDPOINTS
app.use('/', Blog)


module.exports = app

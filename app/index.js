const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// PAGES
const Blog = require('./routes/Blog.js')
const FAQ = require('./routes/faq.js')
const Login = require('./routes/login.js')

// ENDPOINTS
app.use('/blogs', Blog)
app.use('/faq', FAQ)
app.use('/login', Login)


module.exports = app

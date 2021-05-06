const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

// PAGES
const Blog = require('./routes/Blog.js')
const Like = require('./routes/Like.js')
const FAQ = require('./routes/faq.js')

// ENDPOINTS
app.use('/blogs', Blog)
app.use('/faq', FAQ)
app.use("/like" , Like)


module.exports = app

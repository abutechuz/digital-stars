const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../data/')))
app.use(fileUpload({ parseNested: true }))

// PAGES
const Blog = require('./routes/Blog.js')
const Like = require('./routes/Like.js')
const FAQ = require('./routes/faq.js')
const Login = require('./routes/login.js')
const Info = require('./routes/info.js')
const Admin = require('./routes/admin.js')



// ENDPOINTS
app.use('/blogs', Blog)
app.use('/faq', FAQ)
app.use("/like" , Like)
app.use('/login', Login)
app.use("/info" , Info)
app.use("/admin" , Admin)



module.exports = app

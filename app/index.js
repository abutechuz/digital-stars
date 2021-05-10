const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const helmet = require('helmet')
const path = require('path')


const app = express()
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try after few minutes!'
})

app.use(xss())
app.use(helmet())
app.use(limiter)
app.use(express.json({ limit: '10kb'}))
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../data/')))
app.use(fileUpload({ parseNested: true }))

// PAGES
const Blog = require('./routes/blog.js')
const Like = require('./routes/like.js')
const FAQ = require('./routes/faq.js')
const Login = require('./routes/login.js')
const Info = require('./routes/info.js')
const Admin = require('./routes/admin.js')
const Numbers = require('./routes/numbers.js')




// ENDPOINTS
app.use('/blogs', Blog)
app.use('/faq', FAQ)
app.use("/like" , Like)
app.use('/login', Login)
app.use("/info" , Info)
app.use("/admin" , Admin)
app.use("/numbers" , Numbers)




module.exports = app

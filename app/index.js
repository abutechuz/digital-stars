const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const helmet = require('helmet')
const path = require('path')

const app = express()
const auth = require('./library/function/auth.js')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  message: 'Too many requests. Please try after few minutes!'
})

app.use(xss())
app.use(cors({origin:"*"}))
app.use(helmet())
app.use(limiter)
app.use(express.json())
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
const Slide = require('./routes/slide.js')
const Members = require('./routes/member.js')

// ENDPOINTS
app.use('/blogs', async (req, res, next) => await auth(req , res , next , ['GET']), Blog)

app.use('/faq', async (req, res, next) => await auth(req , res , next , ['GET']), FAQ)

app.use('/like', Like)

app.use('/info', async (req, res, next) => await auth(req , res , next , ['GET']), Info)

app.use('/login', Login)

app.use('/admin', async (req, res, next) => await auth(req , res , next , []), Admin)

app.use('/numbers',async (req, res, next) => await auth(req , res , next , ['POST' , 'GET']), Numbers)

app.use("/slide" , async (req, res, next) => await auth(req , res , next , ['GET']), Slide)

app.use("/members" , async (req, res, next) => await auth(req , res , next , ['GET']), Members)

module.exports = app

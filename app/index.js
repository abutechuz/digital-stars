const express = require('express')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const rateLimit = require('express-rate-limit')
const xss = require('xss-clean')
const helmet = require('helmet')
const path = require('path')
const jwt = require('jsonwebtoken');


const app = express()
const auth = require('./library/function/auth.js')
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests. Please try after few minutes!'
})

app.use(xss())
app.use(helmet())
app.use(limiter)
app.use(express.json({ limit: '10kb' }))
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
app.use('/blogs', (req, res, next) => {
  try {
    const m = req.method
    
    if (m !== 'GET') {
      auth(req, res, next)
    } else {
      next()
    }
  } catch (error) {
    res.status(401).send({error: error.message})
  }
  
}, Blog)

app.use('/faq', (req, res, next) => {
  try {
    const m = req.method
    
    if (m === 'POST') {
      auth(req, res, next)
    } else {
      next()
    }
  } catch (error) {
    res.status(401).send({error: error.message})
  }
}, FAQ)

app.use('/like', Like)

app.use('/info', (req, res, next) => {
  try {
    const m = req.method
    
    if (m === 'POST') {
      auth(req, res, next)
    } else {
      next()
    }
  } catch (error) {
    res.status(401).send({error: error.message})
  }
  
}, Info)

app.use('/login', Login)

app.use('/admin', (req, res, next) => {
  try {
    auth(req, res, next)
  } catch (error) {
    ress.status(401).send({error: error.message})
  }
}, Admin)

app.use('/numbers', (req, res, next) => {
  jwt.verify(req.cookies.token, "JWT_KEY", (err, user_id) => {
    if (err) {
      return res.json(err).sendStatus(403);
    } else {
      req.user_id = user_id;
      next();
    }
  });
}, Numbers)

module.exports = app

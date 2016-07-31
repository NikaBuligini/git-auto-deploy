'use strict'

const express = require('express')
const session = require('express-session')
const router = express.Router()

const User = require('./models/users')

function authenticated(req, res, next) {
  if (req.session.user_id) return next()
  res.redirect('/auth/login')
}

function notAuthenticated(req, res, next) {
  if (req.session.user_id) {
    req.session.error = 'Please login'
    return res.redirect('/')
  }

  next()
}

router.get('/', authenticated, (req, res) => {
  res.render('./pages/home', { title: 'React test' })
})

router.get('/auth/login', notAuthenticated, (req, res) => {
  res.render('./pages/login', { message: res.locals.message })
})

router.post('/auth/login', notAuthenticated, (req, res, next) => {
  User.authenticate(req.body.pswd, function(err, user) {
    if (err) return req.session.error = err

    if (user) {
      // Regenerate session when signing in
      return req.session.regenerate(function() {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user_id = user._id
        console.log('Success')
        console.log(req.session.user_id)
        res.redirect('back')
      })
    }

    req.session.error = 'Authentication failed, please check your password'
    res.redirect('/auth/login')
  })
})

router.get('/auth/registrar', notAuthenticated, (req, res) => {
  res.render('./pages/registrar', {})
})

router.post('/auth/registrar', notAuthenticated, (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.pswd
  })
  console.log(user)
  user.save(err => { if (err) throw err })

  res.send(res.toString())
})

router.get('/auth/logout', (req, res) => {
  // destroy the user's session to log them out
  // will be re-created next request
  req.session.destroy(() => {
    res.redirect('/')
  })
})

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

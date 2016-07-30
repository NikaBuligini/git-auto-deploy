'use strict'

const express = require('express')
const session = require('express-session')
const router = express.Router()

const User = require('./models/users')

router.get('/', (req, res) => {
  // var sess = req.session
  // if (sess.views) {
  //   sess.views++
  //   console.log('views: ' + sess.views)
  // } else {
  //   sess.views = 1
  //   console.log('welcome to the session demo. refresh!')
  // }

  if (false) res.redirect('/auth/login')
  res.render('./pages/home', { title: 'React test' })
})

router.get('/auth/login', (req, res) => {
  res.render('./pages/login', {})
})

router.post('/auth/login', (req, res, next) => {
  User.authenticate(req.body.pswd, function(err, isMatch, user) {
    if (err) return res.end(err)
    if (isMatch !== true) return next('password doesn\'t match')

    console.log('Success')
    console.log(user)
    res.redirect('/')
  })
})

router.get('/auth/registrar', (req, res) => {
  res.render('./pages/registrar', {})
})

router.post('/auth/registrar', (req, res) => {
  let user = new User({
    fullname: req.body.fullname,
    email: req.body.email,
    password: req.body.pswd
  })
  console.log(user)
  user.save(err => { if (err) throw err })

  res.send(res.toString())
})

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

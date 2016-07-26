'use strict'

const express = require('express')
const session = require('express-session')
const router = express.Router()

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

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

'use strict'

const express = require('express')
const session = require('express-session')
const router = express.Router()
const request = require('request')
const logger = require('./app/utils/logger')
const debug = require('debug')('worker')

const users = require('./app/controllers/users.controller')
const repos = require('./app/controllers/repos.controller')

debug('booting %s', users)

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

router.get('/test', repos.dump)

router.get('/', authenticated, users.homepage)
router.get('/auth/login', notAuthenticated, users.showLogin)
router.get('/auth/github', notAuthenticated, users.redirectToGithub)
router.get('/auth/callback', users.githubCallback)
router.get('/auth/logout', users.logout)

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

'use strict'

const express = require('express')
const router = express.Router()
const auth = require('./app/middlewares/auth')
// const logger = require('./app/utils/logger')
// const debug = require('debug')('worker')
require('express-session')
require('request')

const users = require('./app/controllers/users.controller')
const repos = require('./app/controllers/repos.controller')

router.get('/', auth.notAuthenticated, users.homepage)
router.get('/create', auth.notAuthenticated, users.homepage)
router.post('/create', auth.notAuthenticated, repos.createApp)
router.get('/auth/login', auth.authenticated, users.showLogin)
router.get('/auth/github', auth.authenticated, users.redirectToGithub)
router.get('/auth/callback', users.githubCallback)
router.get('/auth/fake-login', users.fakeLogin)
router.get('/auth/logout', users.logout)
router.get('/repo/:repoName', auth.notAuthenticated, users.homepage)

router.get('/api/repos', repos.gitHubRepos)
router.get('/api/app/:name', repos.appByName)
router.get('/api/app', repos.installedApps)

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

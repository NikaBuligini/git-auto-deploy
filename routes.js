'use strict'

const express = require('express')
const router = express.Router()
const auth = require('./app/middlewares/auth')
// const logger = require('./app/utils/logger')
// const debug = require('debug')('worker')
require('express-session')
require('request')

const users = require('./app/controllers/users.controller')
const apps = require('./app/controllers/apps.controller')

router.get('/', auth.notAuthenticated, users.homepage)
router.get('/create', auth.notAuthenticated, users.homepage)
router.post('/create', auth.notAuthenticated, apps.createApp)
router.get('/auth/login', auth.authenticated, users.showLogin)
router.get('/auth/github', auth.authenticated, users.redirectToGithub)
router.get('/auth/callback', users.githubCallback)
router.get('/auth/fake-login', users.fakeLogin)
router.get('/auth/logout', users.logout)
router.get('/apps/:appName', auth.notAuthenticated, users.homepage)
router.get('/apps/:appName/overview', auth.notAuthenticated, users.homepage)
router.get('/apps/:appName/connect', auth.notAuthenticated, users.homepage)
router.get('/apps/:appName/activity', auth.notAuthenticated, users.homepage)
router.get('/apps/:appName/access', auth.notAuthenticated, users.homepage)
router.get('/apps/:appName/settings', auth.notAuthenticated, users.homepage)

router.get('/api/repos', apps.gitHubRepos)
router.get('/api/app/:name', apps.appByName)
router.get('/api/app', apps.installedApps)
router.post('/api/app/connect', apps.connectToRepository)

router.get('/page', (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
})

module.exports = router

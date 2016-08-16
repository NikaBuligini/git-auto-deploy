'use strict'

const express = require('express')
const session = require('express-session')
const router = express.Router()
const request = require('request')
const logger = require('./src/logger')

const User = require('./models/users')
const Repository = require('./models/repositories')
const GitHubHelper = require('./models/github')

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
  User.getUser(req.session.user_id, (user) => {
    console.log(user)
    if (user.repositories.length == 0) {
      GitHubHelper.repositories(user.access_token, (repos) => {
        repos.forEach((val) => {
          let repo = new Repository(val)
          repo.save(err => { if (err) return next(err) })

          user.repositories.push(repo._id)
        })

        user.save()

        res.render('./pages/home', {
          title: 'React test',
          user: user,
          repos: repos
        })
      })
    } else {
      res.render('./pages/home', {
        title: 'React test',
        user: user,
        repos: user.repositories
      })
    }
  })
})

router.get('/auth/login', notAuthenticated, (req, res) => {
  res.render('./pages/login', { message: res.locals.message })
})

router.get('/auth/github', notAuthenticated, (req, res) => {
  let state = Math.random().toString(36).substring(7) // random string
  req.session.github_state = state
  res.redirect(GitHubHelper.authUrl(state))
})

router.get('/auth/callback', (req, res) => {
  if (typeof req.query.state === 'undefined' || req.query.state != req.session.github_state) {
    req.session.error = 'invalid state token'
    return res.redirect('/')
  }

  GitHubHelper.exchangeToken(req.query.code, req.query.state, (err, user) => {
    if (err) throw err

    // Regenerate session when signing in
    return req.session.regenerate(() => {
      // Store the user's primary key
      // in the session store to be retrieved,
      // or in this case the entire user object
      req.session.user_id = user._id
      res.redirect('/')
    })
  })
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

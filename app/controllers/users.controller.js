'use strict'

const mongoose = require('mongoose')
const GitHubHelper = require('../utils/github')

const User = require('../models/users')

var UsersController = class UsersController {
  static showLogin(req, res) {
    res.render('./pages/login', { message: res.locals.message })
  }

  static redirectToGithub(req, res) {
    let state = Math.random().toString(36).substring(7) // random string
    req.session.github_state = state
    res.redirect(GitHubHelper.authUrl(state))
  }

  static githubCallback(req, res) {
    if (typeof req.query.state === 'undefined' || req.query.state != req.session.github_state) {
      req.session.error = 'invalid state token'
      return res.redirect('/')
    }

    GitHubHelper.exchangeToken(req.query.code, req.query.state, (err, user) => {
      if (err) throw err
      console.log('RegisteredUser', user)
      // Regenerate session when signing in
      return req.session.regenerate(() => {
        // Store the user's primary key
        // in the session store to be retrieved,
        // or in this case the entire user object
        req.session.user_id = user._id
        res.redirect('/')
      })
    })
  }

  static logout(req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(() => res.redirect('/'))
  }

  static homepage(req, res) {
    console.log('Router', User)
    User.getUser(req.session.user_id, (user) => {
      console.log(user)
      if (user.repositories.length == 0) {
        GitHubHelper.repositories(user.access_token, (repos) => {
          // repos.forEach((val) => {
          //   let repo = new Repository(val)
          //   repo.save(err => { if (err) return next(err) })
          //
          //   user.repositories.push(repo._id)
          // })

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
  }

  static authenticate(gitUser, callback) {
    User.authenticate(gitUser, callback)
  }
}

module.exports = UsersController

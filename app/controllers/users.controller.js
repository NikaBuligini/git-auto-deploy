'use strict'

const GitHubHelper = require('../utils/github')

const User = require('../models/users')

module.exports = {
  showLogin (req, res) {
    res.render('./pages/login', { message: res.locals.message })
  },

  redirectToGithub (req, res) {
    let state = Math.random().toString(36).substring(7) // random string
    req.session.github_state = state
    res.redirect(GitHubHelper.authUrl(state))
  },

  githubCallback (req, res) {
    if (typeof req.query.state === 'undefined' || req.query.state !== req.session.github_state) {
      req.session.error = 'invalid state token'
      return res.redirect('/')
    }

    GitHubHelper.exchangeToken(req.query.code, req.query.state, (err, gitUser) => {
      if (err) throw err

      User.authenticate(gitUser, (user) => {
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
  },

  fakeLogin (req, res) {
    User.getFirstUser((user) => {
      return req.session.regenerate(() => {
        req.session.user_id = user._id
        res.redirect('/')
      })
    })
  },

  logout (req, res) {
    // destroy the user's session to log them out
    // will be re-created next request
    req.session.destroy(() => res.redirect('/'))
  },

  homepage (req, res) {
    User.getUser(req.session.user_id)
      .then((user) => {
        res.render('./pages/home', {
          title: 'React test',
          user: user
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  }
}

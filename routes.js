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

router.get('/git-auth', (req, res) => {
  var GitHubApi = require('github')
  var github = new GitHubApi({
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com", // should be api.github.com for GitHub
    pathPrefix: "/", // for some GHEs; none for GitHub
    headers: {
        "user-agent": "buligini-oauth-test" // GitHub is happy with a unique user agent
    },
    Promise: require('bluebird'),
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
  })

  // OAuth2 Key/Secret (to get a token)
  github.authenticate({
    type: 'oauth',
    key: '32a14c7d7796878b76e4',
    secret: 'd1e2bbcd07ffc91c97f42b7e3d39a300e87f59a9'
  })
  github.users.getFollowingForUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "NikaBuligini"
  }, (err, resp) => {
    res.render('./util/print', {data: resp})
    // console.log(JSON.stringify(res))
  })

  // res.send('Done')
})

module.exports = router

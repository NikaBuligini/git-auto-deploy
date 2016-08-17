'use strict'

const GitHubApi = require("github")
const request = require('request')
const logger = require('./logger')
const debug = require('debug')('worker')

const users = require('../controllers/users.controller')
debug('github %s', users)

const GITHUB_AUTH = 'https://github.com/login/oauth/authorize'

var GitHubHelper = class GitHubHelper {
  static initGitHubApi(access_token) {
    this.github = new GitHubApi({
        // optional
        // debug: true,
        // protocol: "https",
        // host: "api.github.com", // should be api.github.com for GitHub
        // pathPrefix: "/api/v3", // for some GHEs; none for GitHub
        // headers: {
        //     "user-agent": "buligini-oauth-test" // GitHub is happy with a unique user agent
        // },
        // followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
        // timeout: 5000
    })
    this.github.authenticate({
      type: 'oauth',
      key: process.env.GITHUB_CLIENT_ID,
      secret: process.env.GITHUB_SECRET
    })

    if (access_token) {
      this.github.authenticate({
        type: "oauth",
        token: access_token
      })
    }
  }

  static authUrl(state) {
    let options = {
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: ['user', 'repo', 'admin:repo_hook', 'gist']
    }

    return `${GITHUB_AUTH}?client_id=${options.client_id}&scope=${options.scope.join(' ')}&state=${state}`
  }

  static exchangeToken(code, state, cb) {
    this.initGitHubApi()
    request.post({
      url: 'https://github.com/login/oauth/access_token',
      form: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
        state: state
      }
    }, (err, res, body) => {
      body = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')

      this.github.authenticate({
        type: "oauth",
        token: body.access_token
      })

      this.github.users.get({}, (err, user) => {
        if (err) throw err

        console.log(users)
        console.log(users.authenticate)
        users.authenticate({
          access_token: body.access_token,
          github_user_id: user.id,
          email: user.email,
          username: user.login,
          name: user.name,
          avatar_url: user.avatar_url,
          html_url: user.html_url
        }, cb)
      })
    })
  }

  static repositories(access_token, callback) {
    this.initGitHubApi(access_token)

    this.github.repos.getAll({}, (err, repos) => {
      if (err) throw err
      callback(repos)
    })
  }
}

module.exports = GitHubHelper

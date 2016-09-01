'use strict'

const GitHubApi = require('github')
const Promise = require('bluebird')
// const request = Promise.promisifyAll(require('request'), { multiArgs: true })
const rp = require('request-promise')

const GITHUB_AUTH = 'https://github.com/login/oauth/authorize'

var GitHubHelper = class GitHubHelper {
  static initGitHubApi (accessToken) {
    this.github = new GitHubApi({
      Promise: Promise
      // optional
      // debug: true, // console output
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

    if (accessToken) {
      this.github.authenticate({
        type: 'oauth',
        token: accessToken
      })
    }
  }

  static authUrl (state) {
    let options = {
      client_id: process.env.GITHUB_CLIENT_ID,
      scope: ['user', 'repo', 'admin:repo_hook', 'gist']
    }

    return `${GITHUB_AUTH}?client_id=${options.client_id}&scope=${options.scope.join(' ')}&state=${state}`
  }

  static exchangeToken (code, state) {
    this.initGitHubApi()

    let options = {
      url: 'https://github.com/login/oauth/access_token',
      form: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_SECRET,
        code: code,
        state: state
      }
    }

    let accessToken

    return rp(options)
      .then((body) => {
        body = JSON.parse('{"' + decodeURI(body).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')

        accessToken = body.access_token

        this.github.authenticate({
          type: 'oauth',
          token: accessToken
        })

        return this.github.users.get({})
      })
      .then((gitUser) => {
        return new Promise((resolve, reject) => {
          resolve({
            access_token: accessToken,
            github_user_id: gitUser.id,
            email: gitUser.email,
            username: gitUser.login,
            name: gitUser.name,
            avatar_url: gitUser.avatar_url,
            html_url: gitUser.html_url
          })
        })
      })
  }

  static repositories (user) {
    this.initGitHubApi(user.access_token)

    return this.github.repos.getAll({})
  }
}

module.exports = GitHubHelper

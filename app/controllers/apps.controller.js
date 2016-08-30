'use strict'

const GitHubHelper = require('../utils/github')

const User = require('../models/users')
const App = require('../models/apps')
const Repository = require('../models/repositories')

module.exports = {
  saveRepositories (user, callback) {
    GitHubHelper.repositories(user.access_token, (repos) => {
      let repositories = []

      repos.forEach((val) => {
        let repo = new App(val)
        repo.github_repo_id = val.id
        repo.owner_id = val.owner.id
        repo.owner_name = val.owner.login
        repo.owner_avatar_url = val.owner.avatar_url
        repo.owner_html_url = val.owner.html_url
        repo.owner_type = val.owner.type
        repo.save(err => { if (err) console.log(err.message) })
        user.repositories.push(repo._id)
        repositories.push(repo)
      })

      callback(repositories)
    })
  },

  gitHubRepos (req, res) {
    User.getUser(req.session.user_id, (user) => {
      GitHubHelper.repositories(user.access_token, (repos) => {
        res.json({
          repos: repos,
          user: user
        })
      })
    })
  },

  createApp (req, res) {
    User.getUser(req.session.user_id, (user) => {
      App.createApp(req.body.name, req.body.description, (repo) => {
        user.apps.push(repo._id)
        user.save()

        res.redirect('/')
      })
    })
  },

  installedApps (req, res) {
    User.getUser(req.session.user_id, (rawUser) => {
      User.populateWithRepositories(rawUser, (err, user) => {
        if (err) throw err
        res.json(user.apps)
      })
    })
  },

  appByName (req, res) {
    User.getUser(req.session.user_id, (rawUser) => {
      User.populateWithRepositories(rawUser, (err, user) => {
        if (err) throw err
        let result = user.apps.filter(val => val.name === req.params.name)
        res.json(result.length > 0 ? result[0] : {})
      })
    })
  },

  connectToRepository (req, res) {
    User.getUser(req.session.user_id, (rawUser) => {
      GitHubHelper.repositories(rawUser.access_token, (repos) => {
        let targetRepoId = parseInt(req.body.repositoryId)
        let filteredRepos = repos.filter(val => val.id === targetRepoId)

        if (filteredRepos.length === 0) return res.json(false)

        User.populateWithRepositories(rawUser, (err, user) => {
          if (err) throw err
          let filteredApps = user.apps.filter(val => val.name === req.body.appName)

          if (filteredApps.length === 0) return res.json(false)

          Repository.connect(filteredRepos[0], filteredApps[0], () => {
            res.json({
              filtered: filteredRepos,
              filteredApps: filteredApps,
              id: req.body.repositoryId,
              appName: req.body.appName
            })
          })
        })
      })
    })
  }
}

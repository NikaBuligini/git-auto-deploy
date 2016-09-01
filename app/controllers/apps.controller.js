'use strict'

const GitHubHelper = require('../utils/github')

const User = require('../models/users')
const App = require('../models/apps')
const Repository = require('../models/repositories')

module.exports = {
  saveRepositories (user, callback) {
    GitHubHelper.repositories(user)
      .then((repos) => {
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
      .catch((err) => {
        console.log(err)
      })
  },

  gitHubRepos (req, res) {
    let resultUser
    User.getUser(req.session.user_id)
      .then((user) => {
        resultUser = user
        return GitHubHelper.repositories(user)
      })
      .then((repos) => {
        res.json({
          repos: repos,
          user: resultUser
        })
      })
      .catch((err) => {
        console.log(err.message)
      })
  },

  createApp (req, res) {
    User.getUser(req.session.user_id)
      .then((user) => {
        return App.createApp(req.body.name, req.body.description, user)
      })
      .then(() => {
        res.redirect('/')
      })
      .catch((err) => {
        console.log(err.message)
      })
  },

  installedApps (req, res) {
    User.getUser(req.session.user_id)
      .then((user) => {
        res.json(user.apps)
      })
      .catch((err) => {
        console.log(err.message)
      })
  },

  appByName (req, res) {
    User.getUser(req.session.user_id)
      .then((user) => {
        let result = user.apps.filter(val => val.name === req.params.name)
        res.json(result.length > 0 ? result[0] : {})
      })
      .catch((err) => {
        console.log(err.message)
      })
  },

  connectToRepository (req, res) {
    let app
    User.getUser(req.session.user_id)
      .then((user) => {
        app = user.apps.filter(val => val.name === req.body.appName)[0]
        return GitHubHelper.repositories(user)
      })
      .then((repos) => {
        let targetRepoId = parseInt(req.body.repositoryId)
        return Repository.connect(repos.filter(val => val.id === targetRepoId)[0], app)
      })
      .then(() => {
        res.json({
          app: app,
          id: req.body.repositoryId,
          appName: req.body.appName
        })
      })
  }
}

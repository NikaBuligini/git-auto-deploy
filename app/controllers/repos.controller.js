'use strict'

const GitHubHelper = require('../utils/github')

const User = require('../models/users')
const Repository = require('../models/repos')

module.exports = {
  saveRepositories (user, callback) {
    GitHubHelper.repositories(user.access_token, (repos) => {
      let repositories = []

      repos.forEach((val) => {
        let repo = new Repository(val)
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
          own: repos.filter(val => val.owner.id === user.github_user_id),
          other: repos.filter(val => val.owner.id !== user.github_user_id)
        })
      })
    })
  },

  createApp (req, res) {
    User.getUser(req.session.user_id, (user) => {
      Repository.createApp(req.body.name, req.body.description, (repo) => {
        user.repositories.push(repo._id)
        user.save()

        res.redirect('/')
      })
    })
  },

  installedApps (req, res) {
    User.getUser(req.session.user_id, (rawUser) => {
      User.populateWithRepositories(rawUser, (err, user) => {
        if (err) throw err
        res.json(user.repositories)
      })
    })
  },

  appByName (req, res) {
    User.getUser(req.session.user_id, (rawUser) => {
      User.populateWithRepositories(rawUser, (err, user) => {
        if (err) throw err
        let result = user.repositories.filter(val => val.name === req.params.name)
        res.json(result.length > 0 ? result[0] : {})
      })
    })
  }
}

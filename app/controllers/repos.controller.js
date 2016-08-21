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
        res.send(repos)
      })
    })
  }
}

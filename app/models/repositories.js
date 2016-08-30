'use strict'

const mongoose = require('mongoose')

// Create a new schema for our repository data
var RepositorySchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: String,
  github_repo_id: String,
  full_name: String,
  owner_id: String,
  owner_name: String,
  owner_avatar_url: String,
  owner_html_url: String,
  owner_type: String,
  private: Boolean,
  html_url: String,
  fork: Boolean,
  url: String,
  tags_url: String,
  pushed_at: Date,
  clone_url: String,
  default_branch: String,
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
})

RepositorySchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate

  next()
})

RepositorySchema.statics = {
  /**
   * Creates connection between app and repository
   *
   * @param {app} app in our system
   * @param {repository} git repository data
   * @param {callback} fired after execution
   * @api private
   */
  connect (repository, app, callback) {
    let repo = new this(repository)
    repo.github_repo_id = repository.id
    repo.owner_id = repository.owner.id
    repo.owner_name = repository.owner.login
    repo.owner_avatar_url = repository.owner.avatar_url
    repo.owner_html_url = repository.owner.html_url
    repo.owner_type = repository.owner.type

    repo.save(err => { if (err) console.log(err.message) })
    app.connected_repository = repo._id

    callback()
  }
}

// Return a Repository model based upon the defined schema
module.exports = mongoose.model('Repository', RepositorySchema)

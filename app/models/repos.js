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
   * Creates new app instance. method called from /create page
   *
   * @param {name} name of app, which will be slugified (example my-first-project)
   * @param {description} a brief description of app
   * @param {callback} fired after execution
   * @api private
   */
  createApp: function (name, description, callback) {
    let repo = new this({
      name: slugify(name),
      description: description
    })

    repo.save()
    callback(repo)
  }
}

function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '')             // Trim - from end of text
}

// Return a Repository model based upon the defined schema
module.exports = mongoose.model('Repository', RepositorySchema)

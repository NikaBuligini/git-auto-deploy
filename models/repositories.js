'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create a new schema for our repository data
var RepositorySchema = new Schema({
  repo_id         : String,
  github_repo_id  : { type: String, required: true, index: { unique: true } },
  full_name       : String,
  private         : Boolean,
  html_url        : String,
  description     : String,
  fork            : Boolean,
  url             : String,
  tags_url        : String,
  pushed_at       : Date,
  clone_url       : String,
  default_branch  : String,
  created_at      : Date,
  updated_at      : { type: Date, default: Date.now }
})

RepositorySchema.pre('save', function (next) {
  let repo = this

  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate
})

// Return a Repository model based upon the defined schema
module.exports = mongoose.model('Repository', RepositorySchema)

'use strict'

const mongoose = require('mongoose')

// Create a new schema for our repository data
var RepositorySchema = new mongoose.Schema({
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
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate
})

RepositorySchema.statics = {
  /**
   * Test method
   *
   * @api private
   */
  dump: function() {
    let repo = new this()
    repo.github_repo_id = '1'

    repo.save(function(err, repository) {
      if (err) console.log(err.message)

      console.log(repository)
    })
  }
}

// Return a Repository model based upon the defined schema
module.exports = mongoose.model('Repository', RepositorySchema)

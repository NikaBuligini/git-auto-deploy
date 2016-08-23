'use strict'

const mongoose = require('mongoose')

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  user_id: String,
  github_user_id: { type: String, required: true, index: { unique: true } },
  access_token: { type: String },
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  avatar_url: String,
  html_url: String,
  repositories: [{ type: mongoose.Schema.ObjectId, ref: 'Repository' }],
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
})

UserSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate

  next()
})

UserSchema.statics = {
  /**
   * Authenticate github user
   *
   * @param {Object} github user model
   * @param {callback} fired after execution
   * @api private
   */
  authenticate: function (gitUser, callback) {
    this.findOne({ github_user_id: gitUser.github_user_id })
      .populate('repositories')
      .exec((err, user) => {
        if (err) throw err

        if (user) {
          user.access_token = gitUser.access_token
          user.save(err => { if (err) throw err })
        } else {
          user = new this(gitUser)
          user.save((err) => { if (err) throw err })
        }

        callback(user)
      })
  },

  /**
   * Get first user
   *
   * @param {callback} fired after execution
   * @api private
   */
  getFirstUser: function (callback) {
    this.findOne({})
      // .populate('repositories')
      .exec((err, user) => {
        if (err) throw err
        if (!user) throw new Error('User not found')
        callback(user)
      })
  },

  /**
   * Get user by id
   *
   * @param {userId} website user id
   * @param {callback} fired after execution
   * @api private
   */
  getUser: function (userId, callback) {
    this.findById(userId)
      // .populate('repositories')
      .exec((err, user) => {
        if (err) throw err
        if (!user) throw new Error('User not found')
        callback(user)
      })
  },

  /**
   * Get user populated by repositories
   *
   * @param {rawUser} user model without repositories
   * @param {callback} fired after population
   * @api private
   */
  populateWithRepositories: function (rawUser, callback) {
    this.populate(rawUser, 'repositories', callback)
  },

  /**
   * Create a static getUsers method to return user data from the db
   *
   * @param {page} how many entries should be returned on each page
   * @param {skip} count of entries needs to be skipped
   * @param {callback} fired after execution
   * @api private
   */
  getUsers: function (page, skip, callback) {
    let start = (page * 10) + (skip * 1)
    var users = []

    // Query the db, using skip and limit to achieve page chunks
    this.find({}, {skip: start, limit: 10})
      .sort({date: 'desc'})
      .exec((err, docs) => {
        // If everything is cool...
        if (!err) {
          users = docs // We got users
          users.forEach(user => {
            user.active = true // Set them to active
          })
        }

        // Pass them back to the specified callback
        callback(users)
      })
  }
}

// Return a User model based upon the defined schema
module.exports = mongoose.model('User', UserSchema)

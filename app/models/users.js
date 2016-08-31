'use strict'

const mongoose = require('mongoose')
const Promise = require('bluebird')

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  user_id: String,
  github_user_id: { type: Number, required: true, index: { unique: true } },
  access_token: { type: String },
  email: { type: String, required: true, index: { unique: true } },
  username: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  avatar_url: String,
  html_url: String,
  apps: [{ type: mongoose.Schema.ObjectId, ref: 'App' }],
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
  authenticate: function (gitUser) {
    return this.findOne({ github_user_id: gitUser.github_user_id })
      .populate('apps')
      .exec()
      .then((user) => {
        if (user) {
          user.access_token = gitUser.access_token
        } else {
          user = new this(gitUser)
        }

        return user.save()
      })
  },

  /**
   * Get first user
   *
   * @param {callback} fired after execution
   * @api private
   */
  getFirstUser: function () {
    return this.findOne({})
      .populate('apps')
      .exec()
  },

  /**
   * Get user by id
   *
   * @param {userId} website user id
   * @param {callback} fired after execution
   * @api private
   */
  getUser: function (userId) {
    return this.findById(userId)
      .populate('apps')
      .exec()
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

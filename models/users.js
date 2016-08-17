'use strict'

const mongoose = require('mongoose')
const request = require('request')
const logger = require('../src/logger')

const SALT_WORK_FACTOR = 10

// const Repository = require('./repositories')

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  user_id         : String,
  github_user_id  : { type: String, required: true, index: { unique: true } },
  access_token    : { type: String },
  email           : { type: String, required: true, index: { unique: true } },
  username        : { type: String, required: true, index: { unique: true } },
  name            : { type: String, required: true },
  avatar_url      : String,
  html_url        : String,
  repositories    : [{ type: mongoose.Schema.ObjectId, ref: 'Repository' }],
  created_at      : Date,
  updated_at      : { type: Date, default: Date.now }
})

UserSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate
})

UserSchema.statics = {
  /**
   * Authenticate github user
   *
   * @param {Object} github user model
   * @param {callback} fired after execution
   * @api private
   */
  authenticate: function (gitUser, cb) {
    this.findOne({ github_user_id: gitUser.github_user_id })
      .populate('repositories')
      .exec((err, user) => {
        if (err) throw err
        console.log('UserExists', user)
        if (user) {
          user.access_token = gitUser.access_token
          user.save(err => { if (err) return next(err) })
        } else {
          user = new this(gitUser)
          user.save(err => { if (err) throw err })
        }

        cb(null, user)
      })
  },

  /**
   * Get user by id
   *
   * @param {user_id} website user id
   * @param {callback} fired after execution
   * @api private
   */
  getUser: function (user_id, callback) {
    this.findById(user_id).populate('repositories').exec((err, user) => {
      if (err) throw err

      if (!user) throw new Error('User not found')

      callback(user)
    })
    // this.findById(user_id, (err, user) => {
    //   if (err) throw err
    //
    //   if (!user) throw new Error('User not found')
    //
    //   callback(user)
    // })
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

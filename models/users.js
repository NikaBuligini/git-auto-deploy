'use strict'

const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  user_id     : String,
  email       : { type: String, required: true, index: { unique: true } },
  password    : { type: String, required: true },
  fullname    : { type: String, required: true },
  created_at  : Date,
  updated_at  : { type: Date, default: Date.now }
})

UserSchema.pre('save', function (next) {
  let user = this

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next()

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) return next(err)

    // hash the password along with our new salt
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err)

      // override the cleartext password with the hashed one
      user.password = hash
      next()
    })
  })

  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate
})

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err)
    callback(null, isMatch)
  })
}

UserSchema.statics.authenticate = function (email, password, cb) {
  this.findOne({ email: email }, function (err, user) {
    if (err) throw err

    if (user) {
      return user.comparePassword(password, (err, isMatch) => {
        cb(err, isMatch === true ? user : null)
      })
    }

    cb(new Error('User not found'))
  })
}

// Create a static getUsers method to return user data from the db
UserSchema.statics.getUsers = function (page, skip, callback) {
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

// Return a User model based upon the defined schema
module.exports = mongoose.model('User', UserSchema)

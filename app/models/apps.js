'use strict'

const mongoose = require('mongoose')

// Create a new schema for our app data
var AppSchema = new mongoose.Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: String,
  connected_repository: { type: mongoose.Schema.ObjectId, ref: 'Repository' },
  created_at: Date,
  updated_at: { type: Date, default: Date.now }
})

AppSchema.pre('save', function (next) {
  // get the current date
  var currentDate = new Date()

  // change the updated_at field to current date
  this.updated_at = currentDate

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate

  next()
})

AppSchema.statics = {
  /**
   * Creates new app instance. method called from /create page
   *
   * @param {name} name of app, which will be slugified (example my-first-project)
   * @param {description} a brief description of app
   * @param {user} whom app belongs
   * @api private
   */
  createApp: function (name, description, user) {
    let app = new this({
      name: slugify(name),
      description: description
    })

    return app.save()
      .then((app) => {
        user.apps.push(app._id)
        return user.save()
      })
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

// Return a App model based upon the defined schema
module.exports = mongoose.model('App', AppSchema)

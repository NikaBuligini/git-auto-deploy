const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const SALT_WORK_FACTOR = 10;

// Create a new schema for our tweet data
var UserSchema = new mongoose.Schema({
  user_id     : String,
  email       : { type: String, required: true, index: { unique: true } },
  password    : { type: String, required: true },
  first_name  : { type: String, required: true },
  last_name   : { type: String, required: true },
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
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
    this.created_at = currentDate;
})

UserSchema.methods.comparePassword = (candidatePassword, cb) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

// Create a static getTweets method to return tweet data from the db
schema.statics.getUsers = function (page, skip, callback) {
  var tweets = []
  var start = (page * 10) + (skip * 1)

  // Query the db, using skip and limit to achieve page chunks
  Tweet.find({}, 'twid active author avatar body date screenname', {skip: start, limit: 10})
    .sort({date: 'desc'})
    .exec((err, docs) => {
      // If everything is cool...
      if (!err) {
        tweets = docs // We got tweets
        tweets.forEach(tweet => {
          tweet.active = true // Set them to active
        })
      }

      // Pass them back to the specified callback
      callback(tweets)
    })
}

// Return a Tweet model based upon the defined schema
module.exports = mongoose.model('User', UserSchema)

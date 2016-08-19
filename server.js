'use strict'

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')
const promise = require('bluebird')
const path = require('path')
const dotenv = require('dotenv').config()

global.__base = __dirname + '/'

// Create an express instance and set a port variable
const app = express()
const port = process.env.PORT || 8080

// to support JSON-encoded bodies
app.use(bodyParser.json())
// to support URL-encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
}))

// to hold session
app.use(session({
  secret: 'gers1g5e10gt0hcbBRH1h',
  resave: false,
  saveUninitialized: true
}))

// Set jsx as the templating engine
app.set('views', path.resolve(__dirname, 'app/views'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())

app.use(function(req, res, next){
  var err = req.session.error
  var msg = req.session.success
  delete req.session.error
  delete req.session.success
  res.locals.message = ''
  if (err) res.locals.message = { isError: true, text: err }
  if (msg) res.locals.message = { isError: false, text: msg }
  next()
})

// Disable etag headers on responses
app.disable('etag')

// Connect to our mongo database
mongoose.Promise = promise;
mongoose.connect('mongodb://localhost/git-auto-deploy')

var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('connected to mongodb')
})

app.use('/', require('./routes'))

// Set /public as our static content dir
app.use('/', express.static(__dirname + '/public/'))

// Fire it up (start our server)
http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port)
})

// Initialize socket.io
// var io = require('socket.io').listen(server)

'use strict'

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const http = require('http')
const mongoose = require('mongoose')
const path = require('path')
// const config = require('./config')

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
app.set('views', path.resolve(__dirname, 'views'))
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
mongoose.connect('mongodb://localhost/git-auto-deploy')

app.use('/', require('./routes'))
// Index Route
// app.get('/', routes.index)

// Page Route
// app.get('/page/:page/:skip', routes.page)

// Set /public as our static content dir
app.use('/', express.static(__dirname + '/public/'))

// Fire it up (start our server)
http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port)
})

// Initialize socket.io
// var io = require('socket.io').listen(server)

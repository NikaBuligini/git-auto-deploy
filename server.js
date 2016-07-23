const express = require('express')
const exphbs = require('express-handlebars')
const http = require('http')
const mongoose = require('mongoose')
const routes = require('./routes')
// const config = require('./config')

// Create an express instance and set a port variable
const app = express()
const port = process.env.PORT || 8080

// Set handlebars as the templating engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Disable etag headers on responses
app.disable('etag')

// Connect to our mongo database
// mongoose.connect('mongodb://localhost/react-tweets')

// Index Route
app.get('/', routes.index)

// Page Route
app.get('/page/:page/:skip', routes.page)

// Set /public as our static content dir
app.use('/', express.static(__dirname + '/public/'))

// Fire it up (start our server)
http.createServer(app).listen(port, () => {
  console.log('Express server listening on port ' + port)
})

// Initialize socket.io
// var io = require('socket.io').listen(server)

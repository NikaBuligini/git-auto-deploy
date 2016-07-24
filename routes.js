'use strict'

const JSX = require('node-jsx').install()
const React = require('react')
const ReactDOMServer = require('react-dom/server')

module.exports = {
  index: function (req, res) {
    // res.writeHead(200, {'Content-Type': 'text/plain'})
    // res.end('Hello World\n')

    let markup = 'markup'

    res.render('home', {
      markup: markup, // Pass rendered react markup
      greet: 'Hello World',
      state: JSON.stringify({ greet: 'Hello World' }) // Pass current state to client side
    })
  },

  page: function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end('Hello World from page. page=' + req.params.page + ' skip=' + req.params.skip + '\n')
  }
}

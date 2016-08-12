'use strict'

const winston = require('winston')
const fs = require('fs')

let dir = __dirname + '/../logs'

// make directory if it doesn't exists
if (!fs.existsSync(dir)) fs.mkdirSync(dir)

var logger = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true,
      colorize: 'all'
    })
  ],
  exceptionHandlers: [
    new (winston.transports.Console)({
      json: false,
      timestamp: true,
      colorize: 'all'
    }),
    new winston.transports.File({
      filename: dir + '/exceptions.log',
      json: false
    })
  ],
  exitOnError: false
})

logger.add(require('winston-daily-rotate-file'), {
  filename: 'git-auto-deploy',
  dirname: dir,
  datePattern: '.yyyy-MM-dd',
  json: false
})

module.exports = logger

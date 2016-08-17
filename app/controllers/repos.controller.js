'use strict'

const mongoose = require('mongoose')
const GitHubHelper = require('../utils/github')

const Repository = require('../models/repos')

var ReposController = class ReposController {
  static dump(req, res) {
    Repository.dump()
    res.send('Hello World')
  }

  static test() {
    return 'success'
  }
}

module.exports = ReposController

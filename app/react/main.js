import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import Home from './home'

var Routes = React.createClass({
  render () {
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Home}/>
      </Router>
    )
  }
})

ReactDOM.render(
  <Routes />,
  document.getElementById('app')
)

import React from 'react'
import { Link } from 'react-router'

import Dashboard from './dashboard'

export default React.createClass({
  render () {
    return (
      <div>
        <div className="navigation">
          <Link to="/" className="personal-apps-link">
            <i className="fa fa-user" />My apps
          </Link>
          {(() => this.props.params.repoName || '')()}
          <Link to="/create" className="new-app-link">Create new app</Link>
        </div>
        <div>
          {this.props.children || <Dashboard />}
        </div>
      </div>
    )
  }
})

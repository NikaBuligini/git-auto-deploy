import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  render () {
    return (
      <div>
        <div className="navigation">
          <Link to="/dashboard" className="personal-apps-link">
            <i className="fa fa-user" />My apps
          </Link>
          <Link to="/create" className="new-app-link">Create new app</Link>
        </div>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
})

import React from 'react'

import Octopus from '../partials/octopus-logo'

class Navigation extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <nav className="topbar">
        <div className="global-nav">
          <div className="container">
            <Octopus />
            <div className="user-panel">
              <img className="profile" src={this.props.user.avatar_url} />
              <span className="username">{this.props.user.name}</span>
              <a href="/auth/logout" className="logout">
                <i className="fa fa-sign-out" aria-hidden="true" title="Sign out"></i>
              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation

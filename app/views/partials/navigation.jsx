import React from 'react'

import Octopus from '../partials/octopus-logo'

class Navigation extends React.Component {
  render () {
    return (
      <nav className="topbar">
        <div className="global-nav">
          <div className="container">
            <Octopus />
            <div className="user-panel">
              <img className="profile" src={this.props.user.avatar_url} />
              <span className="username">{this.props.user.name}</span>
              <div className="dropdown navbar-right">
                <a href="#" id="profile-dropdown" data-toggle="dropdown"
                  role="button" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-caret-down" aria-hidden="true" title="Sign out"></i>
                </a>
                <ul className="dropdown-menu" aria-labelledby="profile-dropdown">
                  <li>
                    <a href="/auth/logout" title="Sign out">Sign out</a>
                  </li>
                </ul>
              </div>
              <a href="/auth/logout" className="logout">

              </a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation

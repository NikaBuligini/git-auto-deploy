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
              <a href="/auth/logout" className="logout">logout</a>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}

export default Navigation

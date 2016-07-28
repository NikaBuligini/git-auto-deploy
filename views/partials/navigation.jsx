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
          <Octopus />
        </div>
      </nav>
    )
  }
}

export default Navigation

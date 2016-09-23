import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class Tabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      links: [
        { name: 'Overview', action: 'overview' },
        { name: 'Connect', action: 'connect' },
        { name: 'Activity', action: 'activity' },
        { name: 'Access', action: 'access' },
        { name: 'Settings', action: 'settings' }
      ]
    }
  }

  render () {
    const { app } = this.props
    const { links } = this.state

    return (
      <div className="tabs-container">
        <div className="tabs">
          {links.map((val, index) => {
            const url = `/apps/${app.name}/${val.action}`
            return (
              <Link
                to={url}
                key={index}
                className="tab"
                activeClassName="active"
              >
                {val.name}
              </Link>
            )
          })}
        </div>
      </div>
    )
  }
}

Tabs.propTypes = {
  app: PropTypes.object.isRequired
}

export default Tabs

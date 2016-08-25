import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  getInitialState () {
    let root = '/apps/' + this.props.appName

    return {
      links: [
        { name: 'Overview', url: root + '/overview' },
        { name: 'Connect', url: root + '/connect' },
        { name: 'Activity', url: root + '/activity' },
        { name: 'Access', url: root + '/access' },
        { name: 'Settings', url: root + '/settings' },
      ]
    }
  },

  render () {
    let tabs = this.state.links.map((val, index) => {
      return (
        <Link to={val.url} key={index} className="tab" activeClassName="active">{val.name}</Link>
      )
    })

    return (
      <div className="tabs-container">
        <div className="tabs">
          {tabs}
        </div>
      </div>
    )
  }
})

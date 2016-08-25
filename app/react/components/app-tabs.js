import React from 'react'
import { Link } from 'react-router'

export default React.createClass({
  getInitialState () {
    let root = '/apps/' + this.props.params.repoName

    return {
      links: [
        { name: 'Overview', url: root },
        { name: 'Connect', url: root + '/connect' },
        { name: 'Activity', url: root + '/activity' },
        { name: 'Access', url: root + '/access' },
        { name: 'Settings', url: root + '/settings' },
      ]
    }
  },

  render () {
    let tabs = this.state.links.map((val) => {
      return (
        <li>
          <Link to={val.url}>{val.name}</Link>
        </li>
      )
    })

    return (
      <div>
        <ul>
          {tabs}
        </ul>
      </div>
      <Tabs
        onSelect={this.handleSelect}
        selectedIndex={2}
        className="tabs-container"
      >
        <TabList className="tabs">
          <Tab>Overview</Tab>
          <Tab>Connect</Tab>
          <Tab>Activity</Tab>
          <Tab>Access</Tab>
          <Tab>Settings</Tab>
        </TabList>

        <TabPanel>
          <h3>{this.state.repository.name}</h3>
          <p>{this.state.repository.description}</p>
        </TabPanel>
        <TabPanel>
          <span>Connect to your github repository</span>
        </TabPanel>
        <TabPanel>
          <span>Your activities</span>
        </TabPanel>
        <TabPanel>
          <span>Collaborators</span>
        </TabPanel>
        <TabPanel>
          <span>Settings</span>
        </TabPanel>
      </Tabs>
    )
  }
})

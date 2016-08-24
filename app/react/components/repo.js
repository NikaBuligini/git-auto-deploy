import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import $ from 'jquery'

import Loading from '../partials/loading'

Tabs.setUseDefaultStyles(false)

export default React.createClass({
  getInitialState () {
    return {
      source: '/api/app/' + this.props.params.repoName,
      isLoaded: false,
      repository: undefined
    }
  },

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      this.setState({
        isLoaded: true,
        repository: result
      })
    })
  },

  componentWillUnmount () {
    this.serverRequest.abort()
  },

  handleSelect(index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },

  render () {
    let cls = 'repo card'

    if (!this.state.isLoaded) {
      return (
        <Loading cls={cls} />
      )
    }

    return (
      <div className={cls}>
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
      </div>
    )
  }
})

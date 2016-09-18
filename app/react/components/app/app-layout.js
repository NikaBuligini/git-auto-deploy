import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadApps, selectAppForInspect } from '../../actions'

import Tabs from './app-tabs'

function selectApp (props, appName) {
  if (Object.keys(props.app).length === 0) {
    props.loadApps()
  }
  props.selectAppForInspect(appName)
}

class AppLayout extends Component {
  componentDidMount () {
    selectApp(this.props, this.props.params.appName)
  }

  render () {
    let cls = 'app card'

    return (
      <div className={cls}>
        <Tabs appName={this.props.params.appName} />
        {this.props.children}
      </div>
    )
  }
}

AppLayout.propTypes = {
  app: PropTypes.object.isRequired
}

function mapStateToProps (state, ownProps) {
  const { apps } = state.entities
  const { inspectingApp } = state.process

  let filtered = Object.keys(apps)
    .filter((id) => {
      return apps[id].name === inspectingApp
    })
  let app = filtered.length !== 0 ? apps[filtered[0]] : {}

  return {
    app
  }
}

export default connect(mapStateToProps, {
  loadApps,
  selectAppForInspect
})(AppLayout)

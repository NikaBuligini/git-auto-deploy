import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadApps, selectAppForInspect } from '../actions'
import $ from 'jquery'

import Loading from '../components/Loading'

function selectApp (props, appName) {
  if (Object.keys(props.app).length === 0) {
    props.loadApps()
  }
  props.selectAppForInspect(appName)
}

class Overview extends Component {
  componentDidMount () {
    selectApp(this.props, this.props.params.appName)
  }

  render () {
    const { isFetching, app } = this.props

    if (isFetching) {
      return <Loading />
    }

    return (
      <div>
        <h3>{app.name}</h3>
        <p>{app.description}</p>
      </div>
    )
  }
}

Overview.propTypes = {
  preloaded: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  selectAppForInspect: PropTypes.func.isRequired,
  loadApps: PropTypes.func.isRequired
}

Overview.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { preloaded } = state
  const { isFetching } = state.process.apps
  const { apps } = state.entities
  const { inspectingApp } = state.process

  let filtered = Object.keys(apps).filter((id) => {
    return apps[id].name === inspectingApp
  })
  let app = filtered.length !== 0 ? apps[filtered[0]] : {}

  return {
    preloaded,
    isFetching,
    app
  }
}

export default connect(mapStateToProps, {
  selectAppForInspect,
  loadApps
})(Overview)

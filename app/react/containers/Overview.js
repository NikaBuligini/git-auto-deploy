import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from '../components/Loading'

class Overview extends Component {
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
  isFetching: PropTypes.bool.isRequired
}

Overview.defaultProps = {
  isFetching: true
}

function mapStateToProps (state, ownProps) {
  const { preloaded } = state
  const { isFetching } = state.process.apps
  const { apps } = state.entities
  const { inspectingApp } = state.process

  let filtered = Object.keys(apps)
    .filter((id) => {
      return apps[id].name === inspectingApp
    })
  let app = filtered.length !== 0 ? apps[filtered[0]] : {}

  return {
    preloaded,
    isFetching,
    app
  }
}

export default connect(mapStateToProps, {})(Overview)

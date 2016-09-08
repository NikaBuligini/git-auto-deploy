import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { loadApps } from '../actions'
import $ from 'jquery'

import Loading from '../partials/loading'

function loadData (props) {
  props.loadApps()
}

class Dashboard extends Component {
  componentWillMount () {
    loadData(this.props)
  }

  render () {
    let cls = 'gems card'

    const { isFetching, apps } = this.props

    if (isFetching && typeof apps !== 'undefined') {
      return (
        <Loading cls={cls} />
      )
    }

    return (
      <div className={cls}>
        <ul>
          {Object.keys(apps).map((key, index) => {
            let app = apps[key]
            return (
              <li key={index}>
                <Link to={'/apps/' + app.name} className="new-app-link">{app.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Dashboard.propTypes = {
  apps: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadApps: PropTypes.func.isRequired
}

Dashboard.defaultProps = {
  isFetching: true
}

function mapStateToProps(state, ownProps) {
  const { isFetching, apps } = state.applications
  return {
    isFetching,
    apps
  }
}

export default connect(mapStateToProps, {
  loadApps
})(Dashboard)

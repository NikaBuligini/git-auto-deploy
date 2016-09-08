import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRepos } from '../../actions'
import $ from 'jquery'

import Loading from '../../partials/loading'

function loadData (props) {
  props.loadRepos()
}

class Connect extends Component {
  componentWillMount() {
    loadData(this.props)
  }

  connect (repository) {
    let data = {
      repositoryId: repository.id,
      appName: this.props.params.appName
    }

    this.setState({
      isLoaded: false
    })

    this.serverRequest = $.post(this.state.connectSource, data, (result) => {
      this.setState({
        isLoaded: true
      })
    })
  }

  render () {
    const { isFetching, repos, preloaded } = this.props

    if (isFetching && typeof repos !== 'undefined') {
      return (
        <Loading />
      )
    }

    if (Object.keys(repos).length === 0) {
      return <div>No repositories</div>
    }

    return (
      <div className="repositories-container">
        <ul>
          {Object.keys(repos).map((key, index) => {
            let repo = repos[key]

            let boundClick = this.connect.bind(null, repo)
            let cls = 'fa ' + (repo.private ? 'fa-lock' : 'fa-globe')
            return (
              <li key={index} onClick={boundClick}>
                <i className={cls} aria-hidden="true"></i>
                <a>{repo.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Connect.propTypes = {
  preloaded: PropTypes.object.isRequired,
  repos: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  loadRepos: PropTypes.func.isRequired
}

Connect.defaultProps = {
  isFetching: true
}

function mapStateToProps(state, ownProps) {
  const { preloaded } = state
  const { isFetching, repos } = state.repositories
  return {
    preloaded,
    isFetching,
    repos
  }
}

export default connect(mapStateToProps, {
  loadRepos
})(Connect)

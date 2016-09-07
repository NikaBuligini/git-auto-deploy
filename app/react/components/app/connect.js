import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loadRepos } from '../../actions'
import $ from 'jquery'

import Loading from '../../partials/loading'

console.log(loadRepos())

function loadData (props) {
  console.log(props.loadRepos())
}

class Connect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      source: '/api/repos',
      connectSource: '/api/app/connect',
      isLoaded: false,
      repos: undefined,
      user: undefined
    }
    // this.renderUser = this.renderUser.bind(this)
    // this.handleLoadMoreClick = this.handleLoadMoreClick.bind(this)
  }

  componentWillMount() {
    loadData(this.props)
  }

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      this.setState({
        isLoaded: true,
        repos: result.repos,
        user: result.user
      })
    })
  }

  componentWillUnmount () {
    this.serverRequest.abort()
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
    if (!this.state.isLoaded) return <Loading />

    if (this.state.repos.length === 0) return <div>No repositories</div>

    return (
      <div className="repositories-container">
        <ul>
          {this.state.repos.map((val, index) => {
            let boundClick = this.connect.bind(null, val)
            let cls = 'fa ' + (val.owner.id === this.state.user.github_user_id ? 'fa-lock' : 'fa-globe')
            return (
              <li key={index} onClick={boundClick}>
                <i className={cls} aria-hidden="true"></i>
                <a>{val.name}</a>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Connect.propTypes = {
  app: PropTypes.object,
  repos: PropTypes.object,
  loadRepos: PropTypes.func.isRequired
}

function mapStateToProps(state, ownProps) {
  console.log(state)
  return {
    app: state.app,
    repos: state.repos
  }
}

export default connect(mapStateToProps, {
  loadRepos
})(Connect)

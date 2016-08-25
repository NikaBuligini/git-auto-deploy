import React from 'react'
import $ from 'jquery'

import Tabs from './app-tabs'
import Loading from '../../partials/loading'

var RepositoriesComponent = React.createClass({
  render () {
    if (this.props.repositories.length === 0) return null

    return (
      <div>
        <h4>{this.props.title}</h4>
        <ul>
          {this.props.repositories.map((val, index) => {
            let boundClick = this.props.connect.bind(null, val)
            return <li key={index} onClick={boundClick}>{val.name}</li>
          })}
        </ul>
      </div>
    )
  }
})

export default React.createClass({
  getInitialState () {
    return {
      source: '/api/repos',
      connectSource: '/api/app/connect',
      isLoaded: false,
      own: undefined,
      other: undefined
    }
  },

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      this.setState({
        isLoaded: true,
        own: result.own,
        other: result.other
      })
    })
  },

  componentWillUnmount () {
    this.serverRequest.abort()
  },

  connect (repository) {
    let data = {
      repositoryId: repository.id,
      appName: this.props.params.appName
    }

    this.setState({
      isLoaded: false
    })

    // this.serverRequest = $.post(this.state.connectSource, data, (result) => {
    //   this.setState({
    //     isLoaded: true,
    //     repositories: result.repositories,
    //     user: result.user
    //   })
    // })
  },

  render () {
    if (!this.state.isLoaded) return <Loading />

    return (
      <div className="repositories-container">
        <RepositoriesComponent
          title="Repositories you own"
          repositories={this.state.own}
          connect={this.connect} />
        <RepositoriesComponent
          title="Repositories you contribute"
          repositories={this.state.other}
          connect={this.connect} />
        {(() => {
          if (this.state.own.length === 0 && this.state.other.length === 0) {
            return (
              <div>
                No repositories
              </div>
            )
          }
        })()}
      </div>
    )
  }
})

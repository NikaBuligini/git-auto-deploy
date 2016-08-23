import React from 'react'
import $ from 'jquery'

import Loading from '../partials/loading'

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

  render () {
    let cls = 'gems card'

    if (!this.state.isLoaded) {
      return (
        <Loading cls={cls} />
      )
    }

    return (
      <div className={cls}>
        <h3>{this.state.repository.name}</h3>
        <p>{this.state.repository.description}</p>
      </div>
    )
  }
})

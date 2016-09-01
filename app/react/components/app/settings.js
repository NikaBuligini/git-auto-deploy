import React from 'react'
import $ from 'jquery'

import Loading from '../../partials/loading'

export default React.createClass({
  getInitialState () {
    return {
      source: '/api/app/' + this.props.params.appName,
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
    if (!this.state.isLoaded) {
      return (
        <Loading />
      )
    }

    return (
      <div>
        settings
      </div>
    )
  }
})

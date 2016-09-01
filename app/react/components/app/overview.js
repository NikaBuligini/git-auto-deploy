import React from 'react'
import $ from 'jquery'

import Loading from '../../partials/loading'

export default React.createClass({
  getInitialState () {
    return {
      source: '/api/app/' + this.props.params.appName,
      isLoaded: false,
      app: undefined
    }
  },

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      this.setState({
        isLoaded: true,
        app: result
      })
    })
  },

  componentWillUnmount () {
    this.serverRequest.abort()
  },

  render () {
    if (!this.state.isLoaded) {
      return <Loading />
    }

    let app = this.state.app

    return (
      <div>
        <h3>{app.name}</h3>
        <p>{app.description}</p>
      </div>
    )
  }
})

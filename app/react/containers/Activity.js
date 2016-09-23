import React, { Component } from 'react'
import $ from 'jquery'

import Loading from '../components/Loading'

class Activity extends Component {
  constructor (props) {
    super(props)
    this.state = {
      source: '/api/app/' + this.props.params.appName,
      isLoaded: false,
      repository: undefined
    }
  }

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      this.setState({
        isLoaded: true,
        repository: result
      })
    })
  }

  componentWillUnmount () {
    this.serverRequest.abort()
  }

  render () {
    if (!this.state.isLoaded) {
      return (
        <Loading />
      )
    }

    return (
      <div>
        activity
      </div>
    )
  }
}

export default Activity

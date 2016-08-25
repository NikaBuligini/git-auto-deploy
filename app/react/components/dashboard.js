import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

import Loading from '../partials/loading'

export default React.createClass({
  getInitialState () {
    return {
      source: '/api/app',
      isLoaded: false,
      repositories: undefined
    }
  },

  componentDidMount () {
    this.serverRequest = $.get(this.state.source, (result) => {
      console.log(result)
      this.setState({
        isLoaded: true,
        repositories: result
      })
    })
  },

  componentWillUnmount () {
    this.serverRequest.abort()
  },

  render () {
    let cls = 'gems card'

    if (typeof this.state.repositories === 'undefined') {
      return (
        <Loading cls={cls} />
      )
    }

    return (
      <div className={cls}>
        <ul>
          {this.state.repositories.map((repo, index) => {
            return (
              <li key={index}>
                <Link to={'/apps/' + repo.name} className="new-app-link">{repo.name}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
})

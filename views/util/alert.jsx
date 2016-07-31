'use strict'

import React from 'react'

import Pre from './print'

class Alert extends React.Component {
  render() {
    let message = this.props.message

    if (message) {
      let cls = message.isError ? 'alert-error' : 'alert-success'
      
      return (
        <div className={'alert ' + cls}>
          <span>{message.text}</span>
        </div>
      )
    }

    return false
  }
}

export default Alert

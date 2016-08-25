import React from 'react'
import $ from 'jquery'

import Tabs from './app-tabs'

export default React.createClass({
  render () {
    let cls = 'app card'

    return (
      <div className={cls}>
        <Tabs appName={this.props.params.appName} />
        {this.props.children}
      </div>
    )
  }
})

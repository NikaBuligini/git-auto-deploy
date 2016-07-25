import React from 'react'

var DefaultLayout = require('../layouts/default')

var HomeComponent = React.createClass({
  render: function() {
    return (
      <DefaultLayout title={this.props.title}>
        Hello World
      </DefaultLayout>
    )
  }
})

module.exports = HomeComponent

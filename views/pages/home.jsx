import React from 'react'

import DefaultLayout from '../layouts/default'

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        Hello World
      </DefaultLayout>
    )
  }
}

export default HomeComponent

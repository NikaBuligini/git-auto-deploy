import React from 'react'

import DefaultLayout from '../layouts/default'
import Pre from '../util/print'
const GitHubHelper = require(__base + '/models/github')

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <DefaultLayout title={this.props.title} user={this.props.user}>
        Hello World
        {this.props.repos.map((repo) => {
          return (<Pre data={repo.name} />)
        })}
      </DefaultLayout>
    )
  }
}

export default HomeComponent

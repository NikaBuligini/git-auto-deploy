import React from 'react'

import DefaultLayout from '../layouts/default'
import Pre from '../util/print'
const GitHubHelper = require(__base + 'app/utils/github')

class HomeComponent extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <DefaultLayout title={this.props.title} user={this.props.user}>
        <div>
          <ul>
            {this.props.repos.map((repo) => {
              return <li>{repo.full_name}</li>
            })}
          </ul>
        </div>
        {this.props.repos.map((repo) => {
          return (<Pre data={repo} />)
        })}
      </DefaultLayout>
    )
  }
}

export default HomeComponent

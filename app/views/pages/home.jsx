import React from 'react'

import DefaultLayout from '../layouts/default'
import RepositoryGems from '../partials/repository-gems'
import Pre from '../util/print'

class HomeComponent extends React.Component {
  render () {
    return (
      <DefaultLayout title={this.props.title} user={this.props.user}>
        <div id="app"></div>
        <RepositoryGems gems={this.props.repos} />
        <div>
          <ul>
            {this.props.repos.map((repo, index) => {
              return <li key={index}>{repo.full_name}</li>
            })}
          </ul>
        </div>
        {this.props.repos.map((repo, index) => {
          return (<Pre data={repo} key={index} />)
        })}
      </DefaultLayout>
    )
  }
}

export default HomeComponent

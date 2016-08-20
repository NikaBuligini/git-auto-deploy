import React from 'react'

import Card from './card'

class RepositoryGems extends React.Component {
  render () {
    return (
      <Card className="gems">
        <ul>
          {this.props.gems.map((repo, index) => {
            return (
              <li key={index}>
                <a href="#">{repo.name}</a>
                <div className="tools">
                  <a href={repo.html_url} target="_blank">github</a>
                </div>
              </li>
            )
          })}
        </ul>
      </Card>
    )
  }
}

export default RepositoryGems

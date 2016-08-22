import React from 'react'

export default React.createClass({
  render () {
    return (
      <div className="card">
        <form action="/create" method="post" className="create-form">
          <div className="form-group">
            <label htmlFor="name">Project name</label>
            <input id="name" type="text" name="name" className="form-control"
              placeholder="my-project-name" />
          </div>
          <div className="form-group">
            <label htmlFor="description">Project description</label>
            <textarea id="description" name="description" className="form-control"
              placeholder="brief description" />
          </div>
          <button type="submit" className="btn btn-default">Submit</button>
        </form>
      </div>
    )
  }
})

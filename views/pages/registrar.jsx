import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'

class Registrar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <AuthLayout title="Registrar">
        <div className="registrar">
          <Octopus />
          <form>
            <div className="form-group">
              <label htmlFor="fullName">Full name</label>
              <input type="text" className="form-control" id="fullName" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label htmlFor="pswd">Password</label>
              <input type="password" className="form-control" id="pswd" />
            </div>
            <div className="form-group">
              <label htmlFor="pswd_conf">Confirm your password</label>
              <input type="password" className="form-control" id="pswd_conf" />
            </div>
            <button type="button" className="b-btn">Log in</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Registrar

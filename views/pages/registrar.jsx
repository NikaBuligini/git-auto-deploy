import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'

class Registrar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <AuthLayout>
        <div className="registrar">
          <Octopus />
          <form>
            <div className="form-group">
              <label for="fullName">Full name</label>
              <input type="text" className="form-control" id="fullName" />
            </div>
            <div className="form-group">
              <label for="email">Email address</label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="form-group">
              <label for="pswd">Password</label>
              <input type="password" className="form-control" id="pswd" />
            </div>
            <div className="form-group">
              <label for="pswd_conf">Confirm your password</label>
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

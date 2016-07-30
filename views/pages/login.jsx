import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <AuthLayout title="Login">
        <div className="login">
          <Octopus />
          <form method="post" action="/auth/login">
            <div className="form-group">
              <input type="password" name="pswd"
                className="form-control password" placeholder="Password" />
            </div>
            <button type="submit" className="b-btn">Log in</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Login

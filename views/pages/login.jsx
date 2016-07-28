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
          <input type="password" className="form-control password" placeholder="Password" />
          <button type="button" className="b-btn">Log in</button>
        </div>
      </AuthLayout>
    )
  }
}

export default Login

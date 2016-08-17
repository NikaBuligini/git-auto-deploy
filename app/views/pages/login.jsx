import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Alert from '../util/alert'
import Input from '../util/input'

class Login extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <AuthLayout title="Login">
        <div className="login">
          <Octopus />
          <Alert message={this.props.message} />
          <a className="github-login" href="/auth/github">
            <i className="fa fa-github"></i>
            Sign in
          </a>
        </div>
      </AuthLayout>
    )
  }
}

export default Login

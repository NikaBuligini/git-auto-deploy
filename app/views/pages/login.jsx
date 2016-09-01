import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Alert from '../util/alert'

class Login extends React.Component {
  render () {
    return (
      <AuthLayout title="Login">
        <div className="login">
          <Octopus />
          <Alert message={this.props.message} />
          <a className="github-login" href="/auth/github">
            <i className="fa fa-github"></i>
            Sign in
          </a>
          <div>
            <a className="github-login" href="/auth/fake-login">
              <i className="fa fa-github"></i>
              Fake login
            </a>
          </div>
        </div>
      </AuthLayout>
    )
  }
}

export default Login

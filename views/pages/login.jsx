import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Alert from '../util/alert'
import Input from '../util/input'

class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: { label: 'Email address', id: 'email', type: 'email' },
      pswd: { label: 'Password', id: 'pswd', type: 'password' }
    }
  }
  render() {
    return (
      <AuthLayout title="Login">
        <div className="login">
          <Octopus />
          <Alert message={this.props.message} />
          <form method="post" action="/auth/login" className="login-form">
            <Input data={this.state.email} />
            <Input data={this.state.pswd} />
            <button type="submit" className="b-btn">Log in</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Login

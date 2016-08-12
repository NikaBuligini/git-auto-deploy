import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Input from '../util/input'
import Pre from '../util/print'

class Registrar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullname: { label: 'Full name', id: 'fullname', type: 'text' },
      email: { label: 'Email address', id: 'email', type: 'email' },
      pswd: { label: 'Password', id: 'pswd', type: 'password' },
      pswd_conf: { label: 'Confirm your password', id: 'pswd_conf', type: 'password' }
    }
  }

  render() {
    return (
      <AuthLayout title="Registrar">
        <div className="registrar">
          <Octopus />
          <form method="post" action="/auth/registrar">
            <Input data={this.state.fullname} />
            <Input data={this.state.email} />
            <Input data={this.state.pswd} />
            <Input data={this.state.pswd_conf} />
            <button type="submit" className="b-btn">Register</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Registrar

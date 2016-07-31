import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Pre from '../util/print'

class InputComponent extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.data.id}>{this.props.data.label}</label>
        <input type={this.props.data.type ? this.props.data.type : 'text'}
          className="form-control"
          id={this.props.data.id}
          name={this.props.data.id}
          value={this.props.data.value}
          onChange={this.props.handleChange} />
      </div>
    )
  }
}

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
            <InputComponent data={this.state.fullname} />
            <InputComponent data={this.state.email} />
            <InputComponent data={this.state.pswd} />
            <InputComponent data={this.state.pswd_conf} />
            <button type="submit" className="b-btn">Register</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Registrar

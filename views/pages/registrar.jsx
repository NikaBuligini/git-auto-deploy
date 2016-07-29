import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import Pre from '../util/print'

class InputComponent extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.data.id}>{this.props.data.label}</label>
        <input type="text" className="form-control" id={this.props.data.id}
          value={this.props.data.value} onChange={this.props.handleChange} />
      </div>
    )
  }
}

class Registrar extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      fullname: { label: 'Full name', id: 'fullname', value: '' },
      email: { label: 'Email address', id: 'email', value: '' },
      pswd: { label: 'Password', id: 'pswd', value: '' },
      pswd_conf: { label: 'Confirm your password', id: 'pswd_conf', value: '' },
      message: "Hello!"
    }
  }

  render() {
    return (
      <AuthLayout title="Registrar">
        <div className="registrar">
          <Octopus />
          <form>
            <InputComponent data={this.state.fullname} />
            <InputComponent data={this.state.email} />
            <InputComponent data={this.state.pswd} />
            <InputComponent data={this.state.pswd_conf} />
            <button type="button" className="b-btn">Log in</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Registrar

import React from 'react'

import AuthLayout from '../layouts/auth'
import Octopus from '../partials/octopus-logo'
import ObjectInspector from 'react-object-inspector'

class InputComponent extends React.Component {
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id}>{this.props.text}</label>
        <input type="text" className="form-control" id={this.props.id}
          value={this.props.value} onChange={this.props.handleChange} />
      </div>
    )
  }
}

class Registrar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    var data = {
      fullname: '',
      email: '',
      pswd: '',
      pswd_conf: ''
    }
    return (
      <AuthLayout title="Registrar">
        <div className="registrar">
          <Octopus />
          <form>
            <ObjectInspector data={data} />
            <InputComponent id="fullName" value="" text="Full name" />
            <InputComponent id="email" value="" text="Email address" />
            <InputComponent id="pswd" value="" text="Password" />
            <InputComponent id="pswd_conf" value="" text="Confirm your password" />
            <button type="button" className="b-btn">Log in</button>
          </form>
        </div>
      </AuthLayout>
    )
  }
}

export default Registrar

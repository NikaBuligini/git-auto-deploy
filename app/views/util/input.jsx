import React from 'react'

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

export default InputComponent

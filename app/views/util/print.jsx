import React from 'react'

class PrettyPrint extends React.Component {
  render () {
    return (
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    )
  }
}

export default PrettyPrint

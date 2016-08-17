import React from 'react'

class PrettyPrint extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    return (
      <pre>
        {JSON.stringify(this.props.data, null, 2)}
      </pre>
    )
  }
}

export default PrettyPrint

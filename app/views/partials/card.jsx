import React from 'react'

class CardComponent extends React.Component {
  render () {
    return (
      <div className={'card ' + (this.props.className || '')}>{this.props.children}</div>
    )
  }
}

export default CardComponent

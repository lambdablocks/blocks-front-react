import React, { PropTypes, Component } from 'react'

import Translate from '../Translate'

export default class DialogButton extends Component {
  render () {
    const {
      message,
      onClick
    } = this.props

    return (
      <Translate
        childProps={{ onClick }}
        HtmlElement='button'
        message={message}
      />
    )
  }
}

DialogButton.propTypes = {
  message: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

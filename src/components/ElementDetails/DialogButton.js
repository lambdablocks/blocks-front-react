import React, { PropTypes, Component } from 'react'

import Translate from '../Translate'

const DialogButton = React.createClass({
  propTypes: {
    message: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
  },

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
})

export default DialogButton

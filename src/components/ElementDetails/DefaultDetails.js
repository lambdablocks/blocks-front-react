import React, { PropTypes, Component } from 'react'

import DialogButton from './DialogButton'

export default class DefaultDetails extends Component {
  render () {
    const {
      deleteElement,
      id
    } = this.props

    return (
      <DialogButton
        onClick={() => deleteElement(id)}
        message='delete'
      />
    )
  }
}

DefaultDetails.propTypes = {
  deleteElement: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}

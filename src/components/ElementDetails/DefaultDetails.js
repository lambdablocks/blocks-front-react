import React, { PropTypes } from 'react'

import DialogButton from './DialogButton'

const DefaultDetails = React.createClass({
  propTypes: {
    deleteElement: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
  },

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
})

export default DefaultDetails

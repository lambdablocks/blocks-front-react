import React, { PropTypes, Component } from 'react'

import {
  PrimitivePropTypes
} from '../../propTypes'

import CustomValueInput from './CustomValueInput'
import DialogButton from './DialogButton'

export default class PrimitiveDetails extends Component {
  render () {
    const {
      changePrimitiveValue,
      closeDialog,
      deleteElement,
      id,
      primitives,
      type,
      value,
      workspaceIndex
    } = this.props

    return (
      <div>
        <CustomValueInput
          closeDialog={closeDialog}
          handleChange={changePrimitiveValue}
          id={id}
          primitives={primitives}
          type={type}
          value={value}
          workspaceIndex={workspaceIndex}
        />
        <hr />
        <DialogButton
          onClick={() => deleteElement(id)}
          message='delete'
        />
      </div>
    )
  }
}

PrimitiveDetails.propTypes = {
  deleteElement: PropTypes.func.isRequired,
  changePrimitiveValue: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  primitives: PropTypes.objectOf(PrimitivePropTypes).isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  workspaceIndex: PropTypes.number
}

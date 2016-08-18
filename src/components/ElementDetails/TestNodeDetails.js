import React, { PropTypes, Component } from 'react'

import {
  PrimitivePropTypes
} from '../../propTypes'

import CustomValueInput from './CustomValueInput'
import TypesSelect from './TypesSelect'

export default class TestNodeDetails extends Component {
  render () {
    const {
      changeTestNodeType,
      changeTestNodeValue,
      closeDialog,
      id,
      primitives,
      value,
      type,
      workspaceIndex
    } = this.props

    return (
      <div>
        <TypesSelect
          handleChange={changeTestNodeType}
          id={id}
          primitives={primitives}
          type={type}
          workspaceIndex={workspaceIndex}
        />
        {type != 'null' &&
          <div className='topMargin'>
            <CustomValueInput
              closeDialog={closeDialog}
              handleChange={changeTestNodeValue}
              id={id}
              primitives={primitives}
              type={type}
              value={value}
              workspaceIndex={workspaceIndex}
            />
          </div>
        }
      </div>
    )
  }
}

TestNodeDetails.propTypes = {
  changeTestNodeType: PropTypes.func.isRequired,
  changeTestNodeValue: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  primitives: PropTypes.objectOf(PrimitivePropTypes).isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  workspaceIndex: PropTypes.number
}

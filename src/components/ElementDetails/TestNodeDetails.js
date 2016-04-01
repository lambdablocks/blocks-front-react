import React, { PropTypes, Component } from 'react'

import {
  PrimitivePropTypes
} from '../../propTypes'

import CustomValueInput from './CustomValueInput'
import TypesSelect from './TypesSelect'

const styles = {
  width: 300
}

export default class TestNodeDetails extends Component {
  render () {
    const {
      changeTestNodeType,
      changeTestNodeValue,
      id,
      primitives,
      value,
      type,
      workspaceIndex
    } = this.props

    return (
      <div style={styles} >
        <TypesSelect
          handleChange={changeTestNodeType}
          id={id}
          primitives={primitives}
          type={type}
          workspaceIndex={workspaceIndex}
        />
        {type !== 'null' &&
          <CustomValueInput
            handleChange={changeTestNodeValue}
            id={id}
            primitives={primitives}
            type={type}
            value={value}
            workspaceIndex={workspaceIndex}
          />
        }
      </div>
    )
  }
}

TestNodeDetails.propTypes = {
  changeTestNodeType: PropTypes.func.isRequired,
  changeTestNodeValue: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  primitives: PropTypes.objectOf(PrimitivePropTypes).isRequired,
  value: PropTypes.string,
  type: PropTypes.string.isRequired,
  workspaceIndex: PropTypes.number
}

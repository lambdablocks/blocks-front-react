import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'

import { getConstant } from './constants'
import { BindingPropTypes, PositionPropTypes } from '../propTypes'
import { getFillColor } from '../utils'
import Pipe from './Pipe'

const SelectablePipe = React.createClass({
  propTypes: {
    componentName: PropTypes.string.isRequired,
    binding: BindingPropTypes.isRequired,
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    inputPosition: PositionPropTypes.isRequired,
    outputPosition: PositionPropTypes.isRequired
  },

  render () {
    const {
      componentName,
      binding,
      handleClick,
      id,
      inputPosition,
      outputPosition
    } = this.props

    const fillColor = getFillColor(binding.type, binding.value)

    return (
      <Group
        onClick={ (e) => handleClick(id, e) }
      >
        <Pipe
          fillColor={ fillColor }
          inputPosition={ inputPosition }
          outputPosition={ outputPosition }
          strokeColor={ getConstant(componentName, 'strokeColor') }
        />
        { binding.value &&
          <Text
            alignment={ getConstant(componentName, 'alignment') }
            fill={ getConstant(componentName, 'textColor') }
            font={ getConstant(componentName, 'font') }
            x={ (inputPosition.x + outputPosition.x) / 2 + 7 }
            y={ (inputPosition.y + outputPosition.y) / 2 }
          >
            { binding.value }
          </Text>
        }
      </Group>
    )
  }
})

export default SelectablePipe

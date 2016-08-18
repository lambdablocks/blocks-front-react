import React, { PropTypes } from 'react'
import { Group, Text } from 'react-art'

import { getConstant } from './constants'
import Ellipse from './Ellipse'
import { getFillColor } from '../utils'
import Pipe from './Pipe'
import { BindingPropTypes, PositionPropTypes } from '../propTypes'

const TestOutput = React.createClass({
  propTypes: {
    componentName: PropTypes.string.isRequired,
    binding: BindingPropTypes,
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    slotPosition: PositionPropTypes.isRequired,
    workspaceIndex: PropTypes.number.isRequired
  },

  render () {
    const {
      componentName,
      binding,
      handleClick,
      id,
      slotPosition,
      size,
      workspaceIndex
    } = this.props

    const fillColor = getFillColor(binding.type, binding.value)
    const position = {
      x: -((size.width - getConstant(componentName, 'slotWidth')) / 2),
      y: getConstant(componentName, 'slotHeight') +
        getConstant(componentName, 'yOffset') - size.height
    }
    const inputPipePosition = {
      x: 0,
      y: 0
    }
    const outputPipePosition = {
      x: 0,
      y: getConstant(componentName, 'yOffset') - (size.height / 2)
    }

    return (
      <Group
        onClick={(e) => handleClick(id, e, workspaceIndex)}
        x={slotPosition.x}
        y={slotPosition.y}
      >
        <Group
          x={position.x}
          y={position.y}
        >
          <Ellipse
            fillColor={fillColor}
            size={size}
          />
          <Text
            alignment={getConstant(componentName, 'alignment')}
            fill={getConstant(componentName, 'textColor')}
            font={getConstant(componentName, 'font')}
            x={size.width / 2}
            y={size.height / 2 - 5}
          >
            {binding.value === undefined ? '<NONE>' : binding.value}
          </Text>
        </Group>
        <Pipe
          fillColor={fillColor}
          inputPosition={inputPipePosition}
          outputPosition={outputPipePosition}
          strokeColor={fillColor}
        />
      </Group>
    )
  }
})

export default TestOutput

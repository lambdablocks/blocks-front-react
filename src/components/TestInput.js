import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'

import { getConstant } from './constants'
import Ellipse from './Ellipse'
import { getFillColor } from '../utils'
import Pipe from './Pipe'
import { BindingPropTypes, PositionPropTypes } from '../propTypes'

const TestInput = React.createClass({
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
    const slotWidth = getConstant(componentName, 'slotWidth')
    const slotHeight = getConstant(componentName, 'slotHeight')

    const fillColor = getFillColor(binding.type, binding.value)
    const position = {
      x: slotPosition.x - ((size.width - slotWidth) / 2),
      y: slotPosition.y - getConstant(componentName, 'yOffset')
    }
    const inputPipePosition = {
      x: (size.width - slotWidth) / 2,
      y: size.height - slotHeight
    }
    const outputPipePosition = {
      x: (size.width - slotWidth) / 2,
      y: getConstant(componentName, 'yOffset')
    }

    return (
      <Group
        onClick={(e) => handleClick(id, e, workspaceIndex)}
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

export default TestInput

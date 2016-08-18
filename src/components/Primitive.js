import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'

import { getConstant } from './constants'
import { getFillColor, centeredSlotPosition } from '../utils'
import { BindingPropTypes, PositionPropTypes } from '../propTypes'

import Ellipse from './Ellipse'
import Slot from './Slot'

const Primitive = React.createClass({
  startDrag (mouseEvent) {
    const { handleMouseDown, id, position } = this.props

    handleMouseDown(id, mouseEvent, position)
  },

  propTypes: {
    componentName: PropTypes.string.isRequired,
    binding: BindingPropTypes.isRequired,
    id: PropTypes.number.isRequired,
    handleMouseDown: PropTypes.func.isRequired,
    position: PositionPropTypes.isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectSlot: PropTypes.func.isRequired
  },

  render () {
    const {
      componentName,
      binding,
      id,
      handleMouseDown,
      position,
      selectedSlots,
      selectSlot,
      size
    } = this.props

    const fillColor = getFillColor(binding.type, binding.value)
    const slotPosition = centeredSlotPosition(size, componentName)

    return (
      <Group x={position.x} y={position.y} >
        <Group
          onMouseDown={this.startDrag}
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
        <Slot
          key={id}
          fillColor={fillColor}
          id={id}
          parentId={id}
          selectedSlots={selectedSlots}
          selectSlot={selectSlot}
          strokeColor={fillColor}
          x={slotPosition.x}
          y={slotPosition.y}
        />
      </Group>
    )
  }
})

export default Primitive

import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'
import Rectangle from 'react-art/lib/Rectangle.art'

import composeBrick from './composeBrick'
import { getConstant } from './constants'
import { getFillColor } from '../utils'
import {
  BindingPropTypes,
  PositionPropTypes,
  SizePropTypes,
  SlotPropTypes
} from '../propTypes'

import { ERROR } from '../utils/evalUtils'

const Brick = React.createClass({
  startDrag(mouseEvent) {
    const { handleMouseDown, id, position } = this.props

    handleMouseDown(id, mouseEvent, position)
  },

  render() {
    const {
      componentName,
      binding,
      name,
      outputSlots,
      size
    } = this.props

    const midHeight = size.height / 2 - 7
    const outputSlotId = Object.keys(outputSlots)[0]
    const { outputElementIds } = outputSlots[outputSlotId]
    const slotHeight = getConstant(componentName, 'slotHeight')
    const slotWidth = getConstant(componentName, 'slotWidth')

    return (
      <Group
        onMouseDown={ this.startDrag }
        y={ slotHeight }
      >
        <Rectangle
          height={ size.height }
          width={ size.width }
          stroke={ getConstant(componentName, 'strokeColor') }
          fill={ getConstant(componentName, 'fillColor') }
        />
        <Text
          alignment={ getConstant(componentName, 'alignment') }
          fill={ getConstant(componentName, 'textColor') }
          font={ getConstant(componentName, 'font') }
          x={ size.width / 2 }
          y={ midHeight }
        >
          { name }
        </Text>
        { outputElementIds.length == 0 && binding.type &&
          <Text
            fill={ getFillColor(binding.type, binding.value) }
            font={ getConstant(componentName, 'outputFont') }
            x={ ((size.width - slotWidth) / 2) + slotWidth + 3 }
            y={ size.height + 2 }
          >
            { binding.value }
          </Text>
        }
      </Group>
    )
  }
})

Brick.propTypes = {
  componentName: PropTypes.string.isRequired,
  binding: BindingPropTypes,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PositionPropTypes.isRequired,
  outputSlots: SlotPropTypes.isRequired,
  size: SizePropTypes.isRequired
}

export default composeBrick(Brick)

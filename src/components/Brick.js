import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'
import Rectangle from 'react-art/lib/Rectangle.art'

import composeBrick from './composeBrick'
import { getConstant } from './constants'
import {
  EnvironmentPropTypes,
  PositionPropTypes,
  SizePropTypes,
  SlotPropTypes
} from '../propTypes'

import { ERROR } from '../utils/evalUtils'

class Brick extends Component {
  constructor (props) {
    super(props)

    this.startDrag = this.startDrag.bind(this)
  }

  startDrag (mouseEvent) {
    const { handleMouseDown, id, position } = this.props

    handleMouseDown(id, mouseEvent, position)
  }

  render () {
    const {
      componentName,
      environment,
      name,
      outputSlots,
      size
    } = this.props

    const midHeight = size.height / 2
    const outputSlotId = Object.keys(outputSlots)[0]
    const { outputElementIds } = outputSlots[outputSlotId]
    const slotHeight = getConstant(componentName, 'slotHeight')
    const slotWidth = getConstant(componentName, 'slotWidth')

    return (
      <Group
        onMouseDown={this.startDrag}
        y={slotHeight}
      >
        <Rectangle
          height={size.height}
          width={size.width}
          stroke={getConstant(componentName, 'strokeColor')}
          fill={getConstant(componentName, 'fillColor')}
        />
        <Text
          fill={getConstant(componentName, 'textColor')}
          font={getConstant(componentName, 'font')}
          y={midHeight}
        >
          {name}
        </Text>
        {outputElementIds.length === 0 && environment.type &&
          <Text
            fill={
              environment.type === ERROR
              ? getConstant(componentName, 'textErrorColor')
              : getConstant(componentName, 'textColor')
            }
            font={getConstant(componentName, 'font')}
            x={((size.width - slotWidth) / 2) + slotWidth}
            y={size.height}
          >
            {environment.value}
          </Text>
        }
      </Group>
    )
  }
}

Brick.propTypes = {
  componentName: PropTypes.string.isRequired,
  environment: EnvironmentPropTypes,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PositionPropTypes.isRequired,
  outputSlots: SlotPropTypes.isRequired,
  size: SizePropTypes.isRequired
}

export default composeBrick(Brick)

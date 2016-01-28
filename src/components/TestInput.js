import React, { PropTypes, Component } from 'react'
import { Group, Text } from 'react-art'

import Constants from './constants'
import Ellipse from './Ellipse'
import { getFillColor } from '../utils'
import Pipe from './Pipe'
import { PositionPropTypes } from '../propTypes'

class TestInput extends Component {
  render() {
    const {
      handleClick,
      id,
      slotPosition,
      size,
      type,
      value,
      workspaceIndex
    } = this.props

    const {
      Slot: SlotConstants,
      TestInput: TestInputConstants
    } = TestInput._constants

    const fillColor = getFillColor(type, value)
    const position = {
      x: slotPosition.x - ((size.width - SlotConstants.width) / 2),
      y: slotPosition.y - TestInputConstants.yOffset
    }
    const inputPipePosition = {
      x: (size.width - SlotConstants.width) / 2,
      y: size.height - SlotConstants.height
    }
    const outputPipePosition = {
      x: (size.width - SlotConstants.width) / 2,
      y: TestInputConstants.yOffset
    }

    return (
      <Group
        onClick={ (e) => handleClick(id, e, workspaceIndex) }
        x={ position.x }
        y={ position.y }
      >
        <Ellipse
          fillColor={ fillColor }
          size={ size }
        />
        <Text
          fill={ TestInputConstants.textColor }
          font={ TestInputConstants.font }
          y={ size.height / 2 }
        >
          { value === null ? "<NONE>" : value }
        </Text>
        <Pipe
          fillColor={ fillColor }
          inputPosition={ inputPipePosition }
          outputPosition={ outputPipePosition }
          strokeColor={ fillColor }
        />
      </Group>
    )
  }
}

TestInput.propTypes = {
  handleClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
  slotPosition: PositionPropTypes.isRequired,
  value: PropTypes.any,
  workspaceIndex: PropTypes.number.isRequired
}

TestInput._constants = {
  Slot: Constants.Slot,
  TestInput: Constants.TestInput
}

export default TestInput

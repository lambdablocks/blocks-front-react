import React, { PropTypes } from 'react'
import { Group, Path, Shape } from 'react-art'

import { getConstant } from './constants'
import { PIPE } from '../utils/componentNames'
import { PositionPropTypes } from '../propTypes'

const Pipe = React.createClass({
  propTypes: {
    fillColor: PropTypes.string.isRequired,
    inputPosition: PositionPropTypes.isRequired,
    outputPosition: PositionPropTypes.isRequired,
    strokeColor: PropTypes.string.isRequired
  },

  render () {
    const {
      inputPosition,
      fillColor,
      strokeColor,
      outputPosition,
      type
    } = this.props
    const componentName = PIPE
    const slotHeight = getConstant(componentName, 'slotHeight')
    const slotWidth = getConstant(componentName, 'slotWidth')

    const deltaPosition = {
      x: outputPosition.x - inputPosition.x,
      y: outputPosition.y - (inputPosition.y + slotHeight)
    }
    const path = Path()

    path.move(inputPosition.x, inputPosition.y + slotHeight)
    path.line(slotWidth, 0)
    path.line(deltaPosition.x, deltaPosition.y)
    path.line(-slotWidth, 0)
    path.close()

    return (
      <Shape
        d={path}
        fill={fillColor}
        stroke={strokeColor}
      />
    )
  }
})

export default Pipe

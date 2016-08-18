import React, { PropTypes } from 'react'
import Rectangle from 'react-art/lib/Rectangle.art'

import { getConstant } from './constants'
import { isSlotSelected } from '../utils'
import { SLOT } from '../utils/componentNames'

const Slot = React.createClass({
  propTypes: {
    fillColor: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    parentId: PropTypes.number.isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectSlot: PropTypes.func.isRequired,
    strokeColor: PropTypes.string.isRequired,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
  },

  render () {
    const {
      fillColor: unselectedFillColor,
      id,
      parentId,
      selectedSlots,
      selectSlot,
      strokeColor,
      x,
      y
    } = this.props
    const componentName = SLOT

    const fillColor = isSlotSelected(selectedSlots, id) ?
      getConstant(componentName, 'fillColor') :
      unselectedFillColor

    return (
      <Rectangle
        key={id}
        height={getConstant(componentName, 'height')}
        width={getConstant(componentName, 'width')}
        x={x}
        y={y}
        onClick={() => selectSlot(parentId, id)}
        cursor={getConstant(componentName, 'cursor')}
        fill={fillColor}
        stroke={strokeColor}
      />
    )
  }
})

export default Slot

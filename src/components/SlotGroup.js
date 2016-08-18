import React, { PropTypes } from 'react'
import { Group } from 'react-art'

import { getConstant } from './constants'
import { SlotPropTypes } from '../propTypes'

import Slot from './Slot'

const SlotGroup = React.createClass({
  propTypes: {
    componentName: PropTypes.string.isRequired,
    parentId: PropTypes.number.isRequired,
    parentWidth: PropTypes.number.isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectSlot: PropTypes.func.isRequired,
    slots: SlotPropTypes.isRequired,
    y: PropTypes.number.isRequired
  },

  render () {
    const {
      componentName,
      parentId,
      parentWidth,
      selectedSlots,
      selectSlot,
      slots,
      y
    } = this.props

    const slotOffset = getConstant(componentName, 'slotOffset')
    const slotAndOffset = getConstant(componentName, 'slotAndOffset')

    const width = this.slotGroupWidth(slots, slotOffset, slotAndOffset)
    const xOffset = (parentWidth - width) / 2

    return (
      <Group x={xOffset} y={y}>
        {Object.keys(slots).map((slotId, index) => {
          const slot = slots[slotId]
          const x = slotOffset + (slot.index * slotAndOffset)

          return (
            <Slot
              key={slot.id}
              fillColor={getConstant(componentName, 'fillColor')}
              id={slot.id}
              parentId={parentId}
              selectedSlots={selectedSlots}
              selectSlot={selectSlot}
              strokeColor={getConstant(componentName, 'strokeColor')}
              x={x}
              y={0}
            />
          )
        })
        }
      </Group>
    )
  },

  slotGroupWidth (slots, slotOffset, slotAndOffset) {
    const totalSlots = Object.keys(slots).length

    return slotOffset + (totalSlots * slotAndOffset)
  }
})

export default SlotGroup

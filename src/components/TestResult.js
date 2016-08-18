import React, { PropTypes } from 'react'
import Rectangle from 'react-art/lib/Rectangle.art'

import { getTestResultColor } from '../utils/unitTestUtils'
import { PositionPropTypes, SizePropTypes } from '../propTypes'

import { getConstant } from './constants'
import { TEST_RESULT } from '../utils/componentNames'

const TestResult = React.createClass({
  propTypes: {
    mainBrick: PropTypes.shape({
      position: PositionPropTypes.isRequired,
      size: SizePropTypes.isRequired
    }).isRequired,
    unitTest: PropTypes.shape({
      result: PropTypes.string.isRequired
    }).isRequired
  },

  render () {
    const {
      mainBrick,
      unitTest
    } = this.props

    const componentName = TEST_RESULT
    const slotHeight = getConstant(componentName, 'slotHeight')
    const delta = slotHeight * 5 / 3

    return (
      <Rectangle
        fill={getTestResultColor(unitTest)}
        height={mainBrick.size.height + (delta * 2)}
        x={mainBrick.position.x - delta}
        y={mainBrick.position.y - delta + slotHeight}
        width={mainBrick.size.width + (delta * 2)}
      />
    )
  }
})

export default TestResult

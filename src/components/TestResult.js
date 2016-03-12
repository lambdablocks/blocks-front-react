import React, { PropTypes, Component } from 'react'
import Rectangle from 'react-art/lib/Rectangle.art'

import { getFillColor } from '../utils/unitTestUtils'
import { PositionPropTypes, SizePropTypes } from '../propTypes'

import { Slot } from './constants'

class TestResult extends Component {
  render() {
    const {
      mainBrick,
      unitTest
    } = this.props

    const delta = Slot.height * 5 / 3

    return (
      <Rectangle
        fill={ getFillColor(mainBrick, unitTest) }
        height={ mainBrick.size.height + (delta * 2) }
        x={ mainBrick.position.x - delta }
        y={ mainBrick.position.y - delta + Slot.height }
        width={ mainBrick.size.width + (delta * 2) }
      />
    )
  }
}

TestResult.propTypes = {
  mainBrick: PropTypes.shape({
    position: PositionPropTypes.isRequired,
    size: SizePropTypes.isRequired
  }).isRequired,
  unitTest: PropTypes.shape({
    values: PropTypes.object.isRequired
  }).isRequired
}

export default TestResult

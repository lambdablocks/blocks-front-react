import React, { PropTypes } from 'react'
import { Surface } from 'react-art'

import MainBrick from '../containers/MainBrick'
import TestResult from '../components/TestResult'

const workspaceSurfaceStyles = {
  marginRight: '10px'
}

const surfaceStyles = {
  backgroundColor: 'white'
}

const WorkspaceSurface = React.createClass({
  propTypes: {
    index: PropTypes.number.isRequired,
    mainBrick: PropTypes.object.isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    unitTest: PropTypes.object.isRequired
  },

  render () {
    const {
      index,
      mainBrick,
      selectedSlots,
      unitTest
    } = this.props

    return (
      <div
        style={workspaceSurfaceStyles}
      >
        <Surface
          height={600}
          style={surfaceStyles}
          width={mainBrick.size.width + mainBrick.position.x * 2}
        >
          <TestResult
            mainBrick={mainBrick}
            unitTest={unitTest}
          />
          <MainBrick
            selectedSlots={selectedSlots}
            unitTest={unitTest}
            workspaceIndex={index}
            {...mainBrick}
          />
        </Surface>
      </div>
    )
  }
})

export default WorkspaceSurface

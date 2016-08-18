import React, { PropTypes, Component } from 'react'
import { Group } from 'react-art'
import Rectangle from 'react-art/lib/Rectangle.art'

import composeBrick from './composeBrick'
import { getConstant } from './constants'
import { getComponent } from '../utils/ComponentFactory'
import { PositionPropTypes, SizePropTypes } from '../propTypes'

import TestInput from '../containers/TestInput'
import TestOutput from '../containers/TestOutput'

const MainBrick = React.createClass({
  propTypes: {
    componentName: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    inner: PropTypes.arrayOf(
      PropTypes.shape({
        componentName: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        position: PositionPropTypes,
        value: PropTypes.any
      })
    ).isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    size: SizePropTypes.isRequired,
    testInputs: PropTypes.arrayOf(PropTypes.object).isRequired,
    testOutputs: PropTypes.arrayOf(PropTypes.object).isRequired,
    unitTest: PropTypes.object.isRequired,
    workspaceIndex: PropTypes.number.isRequired
  },

  render() {
    const {
      componentName,
      handleClick,
      id,
      inner,
      selectedSlots,
      size,
      testInputs,
      testOutputs,
      unitTest,
      workspaceIndex
    } = this.props
    const slotHeight = getConstant(componentName, 'slotHeight')

    return (
      <Group y={ slotHeight } >
        { testInputs.map((element) => {
            return (
              <TestInput
                key={ element.id }
                workspaceIndex={ workspaceIndex }
                binding={ unitTest.values[element.valueId] || {} }
                { ...element }
              />
            )
          })
        }
        <Rectangle
          height={ size.height }
          width={ size.width }
          stroke={ getConstant(componentName, 'strokeColor') }
          fill={ getConstant(componentName, 'fillColor') }
          onClick={ (e) => handleClick(id, e, workspaceIndex) }
        />
        { inner.map((element) => {
            const ReactComponent = getComponent(element.componentName)

            return (
              <ReactComponent
                key={ element.id }
                selectedSlots={ selectedSlots }
                binding={ unitTest.values[element.valueId] || {} }
                { ...element }
              />
            )
          })
        }
        { testOutputs.map((element) => {
            return (
              <TestOutput
                key={ element.id }
                workspaceIndex={ workspaceIndex }
                binding={ unitTest.values[element.valueId] || {} }
                { ...element }
              />
            )
          })
        }
      </Group>
    )
  }
})

export default composeBrick(MainBrick)

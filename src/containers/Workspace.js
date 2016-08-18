import { connect } from 'react-redux'

import {
  initWorkspace,
  moveElement,
  selectElementOrStopDrag
} from '../actions'

import {
  SELECTABLE_PIPE
} from '../utils/componentNames'

import {
  inputSlotPosition,
  outputSlotPosition,
  selectedSlots
} from '../utils'

import {
  getTestResult
} from '../utils/unitTestUtils'

import Workspace from '../components/Workspace'

const mapStateToProps = (state) => {
  const { entities, selectionState } = state.workspace
  const mainBrick = entities[state.workspace.mainBrickId]

  let selectedElement = {}

  if (!selectionState.dragStarted)
    selectedElement = selectionState.element

  return {
    dragStarted: selectionState.dragStarted,
    mainBrick: {
      ...mainBrick,
      inner: mainBrick.innerIds.map((elementId) => {
        const element = entities[elementId]

        if (element.componentName == SELECTABLE_PIPE) {
          return {
            ...element,
            inputPosition: inputSlotPosition(
              entities[element.input.elementId],
              element.input.slotId
            ),
            outputPosition: outputSlotPosition(
              entities[element.output.elementId],
              element.output.slotId
            )
          }
        } else {
          return element
        }
      }),
      testInputs: mainBrick.testInputIds.map((elementId) => entities[elementId]),
      testOutputs: mainBrick.testOutputIds.map((elementId) => entities[elementId])
    },
    selectedElement,
    selectedSlots: selectedSlots(state.workspace),
    unitTests: state.workspace.unitTests.map((unitTest) => {
      return {
        ...unitTest,
        result: getTestResult(mainBrick, unitTest)
      }
    })
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initWorkspace: (type) => {
      dispatch(initWorkspace(type))
    },
    moveElement: (position) => {
      dispatch(moveElement(position))
    },
    selectElementOrStopDrag: (mousePosition) => {
      dispatch(selectElementOrStopDrag(mousePosition))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Workspace)

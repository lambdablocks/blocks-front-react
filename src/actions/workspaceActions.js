import { isNotEmpty } from '../utils'

import {
  BRICK,
  SELECTABLE_PIPE
} from '../utils/componentNames'

import {
  unique
} from '../utils'

import {
  doesAllInputsHaveValues,
  elementInputValueIds
} from '../utils/evalUtils'

export const ADD_BRICK = 'ADD_BRICK'
export const ADD_PIPE = 'ADD_PIPE'
export const ADD_PRIMITIVE = 'ADD_PRIMITIVE'
export const ADD_UNIT_TEST = 'ADD_UNIT_TEST'
export const CHANGE_PRIMITIVE_VALUE = 'CHANGE_PRIMITIVE_VALUE'
export const CHANGE_TEST_NODE_TYPE = 'CHANGE_TEST_NODE_TYPE'
export const CHANGE_TEST_NODE_VALUE = 'CHANGE_TEST_NODE_VALUE'
export const CLEAR_SLOT_SELECTION = 'CLEAR_SLOT_SELECTION'
export const EVALUATE = 'EVALUATE'
export const LINK_SLOTS = 'LINK_SLOTS'
export const MOVE_ELEMENT = 'MOVE_ELEMENT'
export const REMOVE_ELEMENT = 'REMOVE_ELEMENT'
export const REMOVE_SELECTED_ELEMENT = 'REMOVE_SELECTED_ELEMENT'
export const REMOVE_UNIT_TEST = 'REMOVE_UNIT_TEST'
export const START_DRAG = 'START_DRAG'
export const STOP_DRAG = 'STOP_DRAG'
export const SELECT_ELEMENT = 'SELECT_ELEMENT'
export const SELECT_SLOT = 'SELECT_SLOT'
export const UNEVALUATE = 'UNEVALUATE'
export const UNLINK_SLOTS = 'UNLINK_SLOTS'

export const addBrick = (brick) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addBrick(brick))
  }
}

const _addBrick = (brick) => {
  return {
    type: ADD_BRICK,
    payload: brick
  }
}

export const addPrimitive = (type) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addPrimitive(type))
  }
}

const _addPrimitive = (type) => {
  return {
    type: ADD_PRIMITIVE,
    payload: type
  }
}

export const startDrag = (elementId, mousePosition, elementPosition) => {
  return {
    type: START_DRAG,
    payload: {
      elementId,
      mousePosition,
      elementPosition
    }
  }
}

export const selectElementOrStopDrag = (mousePosition) => {
  return (dispatch, getState) => {
    const { element } = getState().workspace.selectionState

    dispatch(stopDrag())

    if (element.mouseDownPosition.x === mousePosition.x &&
      element.mouseDownPosition.y === mousePosition.y) {
      dispatch(selectElement(element.id, mousePosition))
    } else {
      dispatch(removeSelectedElement())
    }
  }
}

export const stopDrag = () => {
  return {
    type: STOP_DRAG
  }
}

export const moveElement = (currentMousePosition) => {
  return {
    type: MOVE_ELEMENT,
    payload: {
      currentMousePosition
    }
  }
}

export const addPipeOrSelectSlot = (type, elementId, slotId) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(selectSlot(type, elementId, slotId))
    dispatch(addPipeIfBothSlotsSelected())
  }
}

// type: 'input' or 'output' slot
export const selectSlot = (type, elementId, slotId) => {
  return {
    type: SELECT_SLOT,
    payload: {
      elementId,
      slotId,
      type
    }
  }
}

export const addPipeIfBothSlotsSelected = () => {
  return (dispatch, getState) => {
    const { workspace } = getState()
    const { input, output } = workspace.selectionState.pipe

    if (isNotEmpty(input) && isNotEmpty(output)) {
      dispatch(_addPipe(input, output))
      dispatch(_clearSlotSelection())
      dispatch(_linkSlots(input, output))
      dispatch(_evalAllWorkspacesIfNeeded(output.elementId))
    }
  }
}

const _evalAllWorkspacesIfNeeded = (elementId) => {
  return (dispatch, getState) => {
    const { workspace } = getState()

    if (_shouldEval(elementId, workspace)) {
      return dispatch(_evalWorkspaces(elementId))
    }
  }
}

const _shouldEval = (elementId, workspace) => {
  const element = workspace.entities[elementId]

  if (element.componentName !== BRICK) {
    return false
  }

  const valueIds = elementInputValueIds(element)
  const shouldEvalWorkspaces = workspace.unitTests.map((unitTest) =>
    doesAllInputsHaveValues(element, valueIds, unitTest)
  )

  return shouldEvalWorkspaces.filter((shouldEval) => shouldEval).length > 0
}

const _evalWorkspaces = (elementId) => {
  return {
    type: EVALUATE,
    payload: elementId
  }
}

const _addPipe = (input, output) => {
  return {
    type: ADD_PIPE,
    payload: {
      input,
      output
    }
  }
}

const _linkSlots = (input, output) => {
  return {
    type: LINK_SLOTS,
    payload: {
      input,
      output
    }
  }
}

const _clearSlotSelection = () => {
  return {
    type: CLEAR_SLOT_SELECTION
  }
}

export const selectElement = (elementId, mousePosition, workspaceIndex) => {
  return {
    type: SELECT_ELEMENT,
    payload: {
      elementId,
      mousePosition,
      workspaceIndex
    }
  }
}

export const removeElement = (elementId) => {
  return (dispatch, getState) => {
    const { workspace } = getState()
    const element = workspace.entities[elementId]

    if (element.componentName === SELECTABLE_PIPE) {
      dispatch(_unlinkSlots(element))
    }

    if (element.componentName === BRICK) {
      Object.keys(element.inputSlots).forEach((slotId) => {
        const slot = element.inputSlots[slotId]

        if (slot.value) {
          dispatch(
            _unlinkSlots({
              input: slot.value,
              output: {
                elementId: element.id,
                slotId: slot.id
              }
            })
          )
        }
      })
    }

    dispatch(removeSelectedElement())
    dispatch(_uneval(elementId))
    dispatch(_removeElement(elementId))
  }
}

const _removeElement = (elementId) => {
  return {
    type: REMOVE_ELEMENT,
    payload: {
      elementId
    }
  }
}

const _uneval = (elementId) => {
  return {
    type: UNEVALUATE,
    payload: elementId
  }
}

const _unlinkSlots = (element) => {
  return {
    type: UNLINK_SLOTS,
    payload: {
      input: element.input,
      output: element.output
    }
  }
}

export const removeSelectedElement = () => {
  return {
    type: REMOVE_SELECTED_ELEMENT
  }
}

export const addUnitTest = () => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_addUnitTest())
  }
}

const _addUnitTest = () => {
  return {
    type: ADD_UNIT_TEST
  }
}

export const changePrimitiveValue = (elementId, newValue) => {
  return (dispatch, getState) => {
    const { workspace } = getState()
    const primitive = workspace.entities[elementId]
    const { outputElementIds } = primitive.outputSlots[elementId]

    dispatch(_changePrimitiveValue(elementId, newValue))

    unique(outputElementIds).forEach((outputElementId) =>
      dispatch(_evalAllWorkspacesIfNeeded(outputElementId))
    )
  }
}

const _changePrimitiveValue = (elementId, newValue) => {
  return {
    type: CHANGE_PRIMITIVE_VALUE,
    payload: {
      elementId,
      newValue
    }
  }
}

export const changeTestNodeType = (elementId, newType, workspaceIndex) => {
  return (dispatch, getState) => {
    const { workspace } = getState()
    const testNode = workspace.entities[elementId]

    dispatch(_changeTestNodeType(testNode, newType, workspaceIndex))
  }
}

const _changeTestNodeType = (testNode, newType, workspaceIndex) => {
  return {
    type: CHANGE_TEST_NODE_TYPE,
    payload: {
      componentName: testNode.componentName,
      elementId: testNode.id,
      newType,
      workspaceIndex
    }
  }
}

export const changeTestNodeValue = (elementId, newValue, workspaceIndex) => {
  return (dispatch, getState) => {
    const { workspace } = getState()
    const testNode = workspace.entities[elementId]

    dispatch(_changeTestNodeValue(testNode, newValue, workspaceIndex))

    if (testNode.outputSlots) {
      const { outputElementIds } = testNode.outputSlots[elementId]

      unique(outputElementIds).forEach((outputElementId) =>
        dispatch(_evalAllWorkspacesIfNeeded(outputElementId))
      )
    }
  }
}

const _changeTestNodeValue = (testNode, newValue, workspaceIndex) => {
  return {
    type: CHANGE_TEST_NODE_VALUE,
    payload: {
      componentName: testNode.componentName,
      elementId: testNode.id,
      newValue,
      workspaceIndex
    }
  }
}

export const removeUnitTest = (workspaceIndex) => {
  return (dispatch, getState) => {
    dispatch(removeSelectedElement())
    dispatch(_removeUnitTest(workspaceIndex))
  }
}

const _removeUnitTest = (workspaceIndex) => {
  return {
    type: REMOVE_UNIT_TEST,
    payload: workspaceIndex
  }
}

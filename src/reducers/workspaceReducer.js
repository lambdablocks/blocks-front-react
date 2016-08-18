import {
  ADD_BRICK,
  ADD_PIPE,
  ADD_PRIMITIVE,
  ADD_UNIT_TEST,
  CHANGE_PRIMITIVE_VALUE,
  CHANGE_TEST_NODE_TYPE,
  CHANGE_TEST_NODE_VALUE,
  CLEAR_SLOT_SELECTION,
  EVALUATE,
  INIT_WORKSPACE,
  LINK_SLOTS,
  MOVE_ELEMENT,
  REMOVE_ELEMENT,
  REMOVE_SELECTED_ELEMENT,
  REMOVE_UNIT_TEST,
  SELECT_ELEMENT,
  SELECT_SLOT,
  START_DRAG,
  STOP_DRAG,
  UNEVALUATE,
  UNLINK_SLOTS
} from '../actions'

import {
  addBrickToWorkspace,
  addPipeToWorkspace,
  addPrimitiveToWorkspace,
  addUnitTestToWorkspace,
  initWorkspace,
  removeElementInWorkspace,
  removeUnitTest
} from './workspace/addRemoveElementReducer'

import {
  addDragStartedToWorkspace,
  addDragStoppedToWorkspace,
  updateElementInWorkspace
} from './workspace/dragReducer'

import {
  evaluateAllWorkspaces,
  unevaluate
} from './workspace/evaluationReducer'

import {
  addSelectedElementToWorkspace,
  removeSlotSelectionState,
  removeSelectedElementFromWorkspace,
  updateSlotSelectionStateInWorkspace
} from './workspace/selectionReducer'

import {
  changePrimitiveValue,
  changeTestNodeType,
  changeTestNodeValue,
  linkSlots,
  unlinkSlots
} from './workspace/updateElementReducer'

const initialWorkspace = {
  entities: {
    1: {
      innerIds: [],
      testInputIds: [],
      testOutputIds: []
    }
  },
  mainBrickId: 1,
  selectionState: {
    dragStarted: false,
    element: { },
    pipe: {
      input: { },
      output: { }
    }
  },
  unitTests: []
}

export const workspace = (state = initialWorkspace, action) => {
  const { payload, type } = action

  switch (type) {
    case ADD_BRICK:
      return addBrickToWorkspace(state, payload)
    case ADD_PIPE:
      return addPipeToWorkspace(state, payload)
    case ADD_PRIMITIVE:
      return addPrimitiveToWorkspace(state, payload)
    case ADD_UNIT_TEST:
      return addUnitTestToWorkspace(state)
    case CHANGE_PRIMITIVE_VALUE:
      return changePrimitiveValue(state, payload)
    case CHANGE_TEST_NODE_TYPE:
      return changeTestNodeType(state, payload)
    case CHANGE_TEST_NODE_VALUE:
      return changeTestNodeValue(state, payload)
    case CLEAR_SLOT_SELECTION:
      return removeSlotSelectionState(state)
    case EVALUATE:
      return evaluateAllWorkspaces(state, payload)
    case INIT_WORKSPACE:
      return initWorkspace(state, payload)
    case LINK_SLOTS:
      return linkSlots(state, payload)
    case MOVE_ELEMENT:
      return updateElementInWorkspace(state, payload)
    case REMOVE_ELEMENT:
      return removeElementInWorkspace(state, payload)
    case REMOVE_SELECTED_ELEMENT:
      return removeSelectedElementFromWorkspace(state)
    case REMOVE_UNIT_TEST:
      return removeUnitTest(state, payload)
    case SELECT_ELEMENT:
      return addSelectedElementToWorkspace(state, payload)
    case SELECT_SLOT:
      return updateSlotSelectionStateInWorkspace(state, payload)
    case START_DRAG:
      return addDragStartedToWorkspace(state, payload)
    case STOP_DRAG:
      return addDragStoppedToWorkspace(state, payload)
    case UNEVALUATE:
      return unevaluate(state, payload)
    case UNLINK_SLOTS:
      return unlinkSlots(state, payload)
    default:
      return state
  }
}

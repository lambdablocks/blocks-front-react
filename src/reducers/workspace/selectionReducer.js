import * as Utils from '../../utils'

export const updateSlotSelectionStateInWorkspace = (state, payload) => {
  const { elementId, slotId, type } = payload

  const selectedSlots = Utils.selectedSlots(state)
  let pipeSelectionState = Object.assign({}, state.selectionState.pipe)

  // Toggle selection, deselect slot if it is already selected.
  if (!Utils.isSlotSelected(selectedSlots, slotId)) {
    pipeSelectionState[type] = {
      elementId,
      slotId
    }
  } else {
    pipeSelectionState[type] = { }
  }

  // Only allow pipes inside mainBrick element
  if ((Utils.areSlotsInSameElement(pipeSelectionState) &&
      Utils.isPipeNotAllowedInsideElement(state, elementId)) ||
     (Utils.bothSlotsSelected(pipeSelectionState) &&
      Utils.outputElementHasPipe(state, pipeSelectionState.output))
  ) {
    pipeSelectionState = {
      input: { },
      output: { }
    }

    pipeSelectionState[type] = {
      elementId,
      slotId
    }
  }

  return Object.assign({}, state, {
    selectionState: {
      ...state.selectionState,
      pipe: pipeSelectionState
    }
  })
}

export const removeSlotSelectionState = (state) => {
  return Object.assign({}, state, {
    selectionState: {
      ...state.selectionState,
      pipe: {
        input: { },
        output: { }
      }
    }
  })
}

export const addSelectedElementToWorkspace = (state, payload) => {
  const {
    elementId,
    mousePosition,
    workspaceIndex
  } = payload

  return Object.assign({}, state, {
    selectionState: {
      ...state.selectionState,
      element: {
        id: elementId,
        mousePosition,
        workspaceIndex
      }
    }
  })
}

export const removeSelectedElementFromWorkspace = (state) => {
  return Object.assign({}, state, {
    selectionState: {
      ...state.selectionState,
      element: { }
    }
  })
}

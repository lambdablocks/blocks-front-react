import {
  BRICK,
  MAIN_BRICK,
  PRIMITIVE,
  TEST_INPUT
} from '../../utils/componentNames'

const updateElementInAllUnitTests = (workspace, elementId, newProps) => {
  const { unitTests } = workspace

  return Object.assign({}, workspace, {
    ...workspace,
    unitTests: unitTests.map((unitTest) =>
      updateElementValues(unitTest, elementId, newProps)
    )
  })
}

const updateElementInUnitTest = (workspace, elementId, workspaceIndex, newProps) => {
  const { unitTests } = workspace

  return Object.assign({}, workspace, {
    ...workspace,
    unitTests: [
      ...unitTests.slice(0, workspaceIndex),
      updateElementValues(unitTests[workspaceIndex], elementId, newProps),
      ...unitTests.slice(workspaceIndex + 1)
    ]
  })
}

const updateElementValues = (unitTest, elementId, newProps) => {
  return Object.assign({}, unitTest, {
    ...unitTest,
    values: {
      ...unitTest.values,
      [elementId]: {
        ...unitTest.values[elementId],
        ...newProps
      }
    }
  })
}

export const changePrimitiveValue = (workspace, payload) => {
  const {
    elementId,
    newValue
  } = payload

  return updateElementInAllUnitTests(
    workspace,
    elementId,
    {
      componentName: PRIMITIVE,
      value: newValue
    }
  )
}

export const changeTestNodeType = (workspace, payload) => {
  const {
    componentName,
    elementId,
    newType,
    workspaceIndex
  } = payload

  return updateElementInUnitTest(
    workspace,
    elementId,
    workspaceIndex,
    {
      componentName,
      type: newType
    }
  )
}

export const changeTestNodeValue = (workspace, payload) => {
  const {
    componentName,
    elementId,
    newValue,
    workspaceIndex
  } = payload

  return updateElementInUnitTest(
    workspace,
    elementId,
    workspaceIndex,
    {
      componentName,
      value: newValue
    }
  )
}

export const linkSlots = (workspace, payload) => {
  const { input, output } = payload
  const outputElement = workspace.entities[output.elementId]
  let newOutputElementSlots = {}
  let inputElement = workspace.entities[input.elementId]

  if (inputElement.componentName == MAIN_BRICK) {
    inputElement = workspace.entities[input.slotId]
  }

  const outputSlot = inputElement.outputSlots[input.slotId]

  const newInputElementSlots = {
    outputSlots: _addPropsToSlot(
      inputElement.outputSlots,
      input.slotId,
      {
        outputElementIds: [
          ...outputSlot.outputElementIds,
          outputElement.id
        ]
      }
    )
  }

  if (outputElement.componentName == BRICK) {
    const { inputSlots } = outputElement

    newOutputElementSlots = {
      inputSlots: addValueToSlots(inputSlots, input, output)
    }
  }
  if (outputElement.componentName == MAIN_BRICK) {
    const { outputSlots } = outputElement

    newOutputElementSlots = {
      outputSlots: addValueToSlots(outputSlots, input, output)
    }
  }

  return Object.assign({}, workspace, {
    entities: {
      ...workspace.entities,
      [outputElement.id]: {
        ...outputElement,
        ...newOutputElementSlots
      },
      [inputElement.id]: {
        ...inputElement,
        ...newInputElementSlots
      }
    }
  })
}

const addValueToSlots = (slots, input, output) => {
  return _addPropsToSlot(slots, output.slotId, {
    value: {
      slotId: input.slotId,
      elementId: input.elementId
    }
  })
}

const _addPropsToSlot = (slots, slotId, newProps) => {
  return Object.assign({}, slots, {
    [slotId]: {
      ...slots[slotId],
      ...newProps
    }
  })
}

export const unlinkSlots = (workspace, payload) => {
  const { input, output } = payload
  let inputElement = workspace.entities[input.elementId]

  if (inputElement.componentName == MAIN_BRICK) {
    inputElement = workspace.entities[input.slotId]
  }

  const outputSlot = inputElement.outputSlots[input.slotId]
  const index = outputSlot.outputElementIds.indexOf(output.elementId)

  const outputElement = workspace.entities[output.elementId]
  const newOutputElement = _removeSlotValue(outputElement, output)

  return Object.assign({}, workspace, {
    entities: {
      ...workspace.entities,
      [outputElement.id]: newOutputElement,
      [inputElement.id]: {
        ...inputElement,
        outputSlots: {
          ...inputElement.outputSlots,
          [input.slotId]: {
            ...outputSlot,
            outputElementIds: [
              ...outputSlot.outputElementIds.slice(0, index),
              ...outputSlot.outputElementIds.slice(index + 1)
            ]
          }
        }
      }
    }
  })
}

const _removeSlotValue = (element, output) => {
  var slots = {}

  if (output.slotId) {
    if (element.componentName == MAIN_BRICK) {
      Object.assign(slots, { outputSlots: element.outputSlots })

      delete slots.outputSlots[output.slotId]['value']
    } else {
      Object.assign(slots, { inputSlots: element.inputSlots })

      delete slots.inputSlots[output.slotId]['value']
    }
  } else if (output.sourceElementId) {
    if (element.componentName == MAIN_BRICK) {
      Object.assign(slots, { outputSlots: element.outputSlots })

      Object.keys(element.outputSlots).forEach((slotId) => {
        const slot = element.outputSlots[slotId]

        if (slot.value && slot.value.elementId == output.sourceElementId) {
          delete slots.outputSlots[slotId]['value']
        }
      })
    } else {
      Object.assign(slots, { inputSlots: element.inputSlots })

      Object.keys(element.inputSlots).forEach((slotId) => {
        const slot = element.inputSlots[slotId]

        if (slot.value && slot.value.elementId == output.sourceElementId) {
          delete slots.inputSlots[slotId]['value']
        }
      })
    }
  }

  return Object.assign(element, { ...slots })
}

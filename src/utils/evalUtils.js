import {
  BRICK
} from './componentNames'

export const doesAllInputsHaveValues = (element, valueIds, unitTest) => {
  const numberOfInputs = Object.keys(element.inputSlots).length

  return (numberOfInputs == valueIds.length) &&
    (unitTestValues(valueIds, unitTest).length == numberOfInputs)
}

export const elementInputValueIds = (element) => {
  let valueIds = []

  for(let id in element.inputSlots) {
    const inputSlot = element.inputSlots[id]

    if(inputSlot.valueId) {
      valueIds[inputSlot.index] = inputSlot.valueId
    }
  }

  return valueIds
}

const unitTestValues = (valueIds, unitTest) => {
  let values = []

  for(let id in valueIds) {
    const valueId = valueIds[id]
    const element = unitTest.values[valueId]

    if(element && element.type && element.value) {
      values.push({
        id: valueId,
        type: element.type,
        value: element.value
      })
    }
  }

  return values
}

const nativeBricks = {
  boolean: {
    "&&": (a, b) => a && b,
    "||": (a, b) => a || b,
    "!": (a) => !a
  }
}

const parsers = {
  boolean: (value) => value.toLowerCase() == "true",
  number: (value) => parseFloat(value),
  string: (value) => value
}

const _evalBrick = (brick, args) => {
  const { moduleName, name } = brick
  const brickOutput = nativeBricks[moduleName][name].apply(null, args)

  return {
    componentName: BRICK,
    type: typeof brickOutput,
    value: brickOutput.toString()
  }
}

export const tryEvalPath = (workspace, unitTest, elementId) => {
  let newUnitTest = Object.assign({}, unitTest)

  return _tryEvalPath(workspace, newUnitTest, elementId)
}

const _tryEvalPath = (workspace, unitTest, elementId) => {
  const brick = workspace.entities[elementId]
  let args = []

  if(brick.componentName != BRICK) {
    return unitTest
  }

  for(var id in brick.inputSlots) {
    const { valueId } = brick.inputSlots[id]
    const slotValue = unitTest.values[valueId]

    if(slotValue && slotValue.type && slotValue.value) {
      args.push(parsers[slotValue.type](slotValue.value))
    } else {
      return unitTest
    }
  }

  const outputSlotId = Object.keys(brick.outputSlots)[0]
  const outputSlot = brick.outputSlots[outputSlotId]

  unitTest.values[outputSlotId] = _evalBrick(brick, args)

  outputSlot.outputElementIds.forEach((id) =>
    _tryEvalPath(workspace, unitTest, id)
  )

  return unitTest
}

export const evalPathValueIds = (workspace, outputSlots, valueIds) => {
  const outputSlotId = Object.keys(outputSlots)[0]
  const outputSlot = outputSlots[outputSlotId]

  valueIds.push(outputSlot.id)

  if(outputSlot.outputElementIds) {
    outputSlot.outputElementIds.forEach((id) => {
      const element = workspace.entities[id]

      evalPathValueIds(workspace, element.outputSlots, valueIds)
    })
  }

  return valueIds
}

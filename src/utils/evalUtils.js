import {
  BRICK,
  MAIN_BRICK
} from './componentNames'

export const ERROR = 'error'

export const doesAllInputsHaveValues = (element, valueIds, unitTest) => {
  const numberOfInputs = Object.keys(element.inputSlots).length

  return (numberOfInputs == valueIds.length) &&
    (unitTestValues(valueIds, unitTest).length == numberOfInputs)
}

export const elementInputValueIds = (element) => {
  let valueIds = []

  for (let id in element.inputSlots) {
    const inputSlot = element.inputSlots[id]

    if (inputSlot.value) {
      valueIds[inputSlot.index] = inputSlot.value.slotId
    }
  }

  return valueIds
}

const unitTestValues = (valueIds, unitTest) => {
  let values = []

  for (let id in valueIds) {
    const valueId = valueIds[id]
    const element = unitTest.values[valueId]

    if (element && element.type !== ERROR && element.value) {
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
  arithmetic: {
    '+': (a, b) => {
      if (assert([a, b], ['number', 'number']))
        return a + b
      throw 'Invalid parameters'
    },
    '-': (a, b) => {
      if (assert([a, b], ['number', 'number']))
        return a - b
      throw 'Invalid parameters'
    },
    '*': (a, b) => {
      if (assert([a, b], ['number', 'number']))
        return a * b
      throw 'Invalid parameters'
    },
    '/': (a, b) => {
      if (assert([a, b], ['number', 'number']))
        return a / b
      throw 'Invalid parameters'
    }
  },
  boolean: {
    '&&': (a, b) => a && b,
    '||': (a, b) => a || b,
    '!': (a) => !a
  },
  eq: {
    '==': (a, b) => a === b
  },
  hof: {
    'join': (a) => a.join(''),
    'sort': (a) => a.slice(0).sort()
  },
  parse: {
    'toNumber': (a) => {
      if (assert([a], ['string']))
        return parseFloat(a)
      throw 'Invalid parameters'
    },
    'toString': (a) => {
      if (assert([a], ['number']))
        return a.toString()
      throw 'Invalid parameters'
    }
  },
  string: {
    'concat': (a, b) => {
      if (assert([a, b], ['string', 'string']))
        return a.concat(b)
      throw 'Invalid parameters'
    },
    'length': (a) => {
      if (assert([a], ['string']))
        return a.length
      throw 'Invalid parameters'
    },
    'reverse': (a) => {
      if (assert([a], ['string']))
        return a.split('').reverse().join('')
      throw 'Invalid parameters'
    },
    'split': (a) => {
      if (assert([a], ['string']))
        return a.split('')
      throw 'Invalid parameters'
    }
  }
}

const assert = (parameters, types) => {
  for (var i = 0; i < parameters.length; i++) {
    if (typeof parameters[i] !== types[i])
      return false
  }

  return true
}

const parsers = {
  boolean: (value) => value.toLowerCase() == 'true',
  list: (value) => value.split(','),
  number: (value) => parseFloat(value),
  string: (value) => value
}

const _evalBrick = (brick, args) => {
  const { moduleName, name } = brick
  let brickOutput

  try {
    brickOutput = nativeBricks[moduleName][name].apply(null, args)
  } catch (error) {
  }

  if (brickOutput === undefined) {
    return {
      componentName: BRICK,
      type: ERROR,
      value: 'error'
    }
  }

  return {
    componentName: BRICK,
    type: _getOutputType(brickOutput),
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

  if (brick.componentName != BRICK) {
    return unitTest
  }

  for (var id in brick.inputSlots) {
    const { value } = brick.inputSlots[id]
    const slotValue = unitTest.values[value.slotId]

    if (slotValue && slotValue.type && slotValue.value) {
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

export const evalPathValueIds = (workspace, element, valueIds) => {
  if (element.componentName != MAIN_BRICK) {
    const outputSlotId = Object.keys(element.outputSlots)[0]
    const outputSlot = element.outputSlots[outputSlotId]

    valueIds.push(outputSlot.id)

    if (outputSlot.outputElementIds) {
      outputSlot.outputElementIds.forEach((id) => {
        evalPathValueIds(workspace, workspace.entities[id], valueIds)
      })
    }
  }

  return valueIds
}

const _getOutputType = (output) => {
  if (Array.isArray(output)) {
    return 'list'
  } else {
    return typeof output
  }
}

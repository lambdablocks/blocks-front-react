import {
  CLEAN,
  UNIT_TEST
} from '../../components/constants'

import {
  inputSlotPosition,
  outputSlotPosition
} from '../../utils'

import {
  BRICK,
  MAIN_BRICK,
  PRIMITIVE,
  SELECTABLE_PIPE,
  TEST_INPUT,
  TEST_OUTPUT
} from '../../utils/componentNames'

const TestNodeDefaults = {
  size: {
    height: 30,
    width: 60
  }
}

const Defaults = {
  [BRICK]: {
    position: {
      x: 50,
      y: 50
    },
    size: {
      height: 40,
      width: 100
    }
  },
  [MAIN_BRICK]: {
    position: {
      [CLEAN]: {
        x: 50,
        y: 50
      },
      [UNIT_TEST]: {
        x: 50,
        y: 80
      }
    },
    size: {
      [CLEAN]: {
        height: 450,
        width: 600
      },
      [UNIT_TEST]: {
        height: 400,
        width: 350
      }
    }
  },
  [PRIMITIVE]: {
    position: {
      x: 50,
      y: 50
    },
    size: {
      height: 30,
      width: 60
    }
  },
  [TEST_INPUT]: {
    size: TestNodeDefaults.size
  },
  [TEST_OUTPUT]: {
    size: TestNodeDefaults.size
  }
}

let id = 1
// TODO: Generate id's with an UID function ??
const nextId = () => id++

export const newBrick = (brick, parentId) => {
  const { arity, moduleName, name } = brick
  let inputSlots = {}
  const outputSlotId = nextId()

  for(var i=0; i < arity; i++) {
    const id = nextId()

    inputSlots[id] = {
      id,
      index: i
    }
  }

  return {
    componentName: BRICK,
    id: nextId(),
    inputSlots,
    moduleName,
    name,
    outputSlots: {
      [outputSlotId]: {
        id: outputSlotId,
        index: 0,
        outputElementIds: [],
        value: {
          slotId: outputSlotId
        }
      }
    },
    parentId,
    position: Defaults[BRICK].position,
    size: Defaults[BRICK].size,
    valueId: outputSlotId
  }
}

const newMainBrick = (mainBrickId, workspaceType = UNIT_TEST) => {
  let mainBrick = {
    componentName: MAIN_BRICK,
    id: mainBrickId,
    innerIds: [],
    inputSlots: { },
    outputSlots: { },
    position: Defaults[MAIN_BRICK].position[workspaceType],
    size: Defaults[MAIN_BRICK].size[workspaceType],
    workspaceType
  }

  if(workspaceType != CLEAN) {
    const inputSlotIds = [nextId(), nextId()]
    const outputSlotId = nextId()

    mainBrick.inputSlots = {
      [inputSlotIds[0]]: {
        id: inputSlotIds[0],
        index: 0
      },
      [inputSlotIds[1]]: {
        id: inputSlotIds[1],
        index: 1
      }
    }

    mainBrick.outputSlots = {
      [outputSlotId]: {
        id: outputSlotId,
        index: 0
      }
    }
  }

  return mainBrick
}

export const newPrimitive = (type, parentId) => {
  const elementId = nextId()

  return {
    componentName: PRIMITIVE,
    id: elementId,
    outputSlots: {
      [elementId]: {
        id: elementId,
        index: 0,
        outputElementIds: [],
        valueId: elementId
      }
    },
    parentId,
    position: Defaults[PRIMITIVE].position,
    size: Defaults[PRIMITIVE].size,
    valueId: elementId
  }
}

export const newPipe = (payload) => {
  const { input, output } = payload

  return {
    componentName: SELECTABLE_PIPE,
    id: nextId(),
    input,
    output,
    type: "null",
    valueId: input.slotId
  }
}

export const newTestInputs = (mainBrick) => {
  let testInputs = _newTestNodes(
    mainBrick,
    TEST_INPUT,
    mainBrick.inputSlots,
    inputSlotPosition
  )

  for(var id in testInputs) {
    const testInput = testInputs[id]

    testInput.outputSlots = {
      [testInput.id]: {
        id: testInput.id,
        index: 0,
        outputElementIds: []
      }
    }
  }

  return testInputs
}

export const newTestOutputs = (mainBrick) => {
  return _newTestNodes(
    mainBrick,
    TEST_OUTPUT,
    mainBrick.outputSlots,
    outputSlotPosition
  )
}

const _newTestNodes = (mainBrick, componentName, slots, slotPosition) => {
  let testNodes = {}

  for(var id in slots) {
    const slot = slots[id]

    testNodes[id] = {
      componentName,
      id: slot.id,
      slotPosition: slotPosition(mainBrick, slot.id),
      size: Defaults[componentName].size,
      type: "null",
      valueId: slot.id
    }
  }

  return testNodes
}

export const newWorkspace = (queryParams) => {
  const mainBrickId = nextId()
  const mainBrick = newMainBrick(mainBrickId, queryParams['ws'])
  const testInputs = newTestInputs(mainBrick)
  const testOutputs = newTestOutputs(mainBrick)

  const testInputIds = Object.keys(testInputs).map((testInput) => {
    return testInputs[testInput].id
  })

  const testOutputIds = Object.keys(testOutputs).map((testOutput) => {
    return testOutputs[testOutput].id
  })

  return {
    entities: {
      [mainBrickId]: {
        ...mainBrick,
        testInputIds,
        testOutputIds
      },
      ...testInputs,
      ...testOutputs
    },
    mainBrickId: mainBrickId,
    selectionState: {
      dragStarted: false,
      element: { },
      pipe: {
        input: { },
        output: { }
      }
    },
    unitTests: [
      {
        values: { }
      }
    ]
  }
}

export const pipeConnectedToElement = (element, elementId) => {
  return element.componentName == SELECTABLE_PIPE &&
    (element.input.elementId == elementId ||
     element.output.elementId == elementId)
}

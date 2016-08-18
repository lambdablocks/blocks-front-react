import {
  PRIMITIVE
} from '../../utils/componentNames'

import {
  newBrick,
  newPipe,
  newPrimitive,
  newUnitTest,
  newWorkspace,
  pipeConnectedToElement
} from './workspaceReducerUtils'

export const initWorkspace = (workspace, type) =>
  newWorkspace(type)

export const addBrickToWorkspace = (workspace, attributes) =>
  addToWorkspace(workspace, newBrick(attributes, workspace.mainBrickId))

export const addPipeToWorkspace = (workspace, attributes) =>
  addToWorkspace(workspace, newPipe(attributes))

export const addPrimitiveToWorkspace = (workspace, primitiveType) => {
  const primitive = newPrimitive(primitiveType, workspace.mainBrickId)
  const newWorkspace = addToWorkspace(workspace, primitive)

  newWorkspace.unitTests = newWorkspace.unitTests.map((unitTest) => {
    return Object.assign({}, unitTest, {
      values: {
        ...unitTest.values,
        [primitive.id]: {
          componentName: PRIMITIVE,
          type: primitiveType
        }
      }
    })
  })

  return newWorkspace
}

export const addUnitTestToWorkspace = (workspace) => {
  const values = workspace.unitTests[0].values
  let newValues = {}

  for (let elementId in values) {
    if (values[elementId].componentName == PRIMITIVE)
      newValues[elementId] = values[elementId]
  }

  return Object.assign({}, workspace, {
    ...workspace,
    unitTests: [
      ...workspace.unitTests,
      {
        values: newValues
      }
    ]
  })
}

const addToWorkspace = (workspace, element) => {
  const mainBrickId = workspace.mainBrickId
  const mainBrick = workspace.entities[mainBrickId]

  return Object.assign({}, workspace, {
    ...workspace,
    entities: {
      ...workspace.entities,
      [mainBrickId]: {
        ...mainBrick,
        innerIds: [
          ...mainBrick.innerIds,
          element.id
        ]
      },
      [element.id]: element
    }
  })
}

export const removeElementInWorkspace = (workspace, payload) => {
  const { elementId } = payload
  const { entities, mainBrickId } = workspace
  const mainBrick = entities[mainBrickId]

  let newEntities = {}
  let removedKeys = []

  for (let key in entities) {
    const element = entities[key]

    // Skip if key is the elementId or is a pipe connected to this elementId
    if (!(key == elementId || pipeConnectedToElement(element, elementId))) {
      newEntities[key] = element
    } else {
      removedKeys.push(key)
    }
  }

  const newUnitTests = workspace.unitTests.map((unitTest) => {
    let newValues = {}
    for (let key in unitTest.values) {
      if (removedKeys.indexOf(key) === -1)
        newValues[key] = unitTest.values[key]
    }
    return {
      ...unitTest,
      values: newValues
    }
  })

  return Object.assign({}, workspace, {
    ...workspace,
    entities: {
      ...newEntities,
      [mainBrickId]: {
        ...mainBrick,
        // Remove from mainBrick.innerIds all the entities removed by
        // the loop above
        innerIds: mainBrick.innerIds.filter((id) => newEntities[id])
      }
    },
    unitTests: newUnitTests
  })
}

export const removeUnitTest = (workspace, workspaceIndex) => {
  const { unitTests } = workspace

  return Object.assign({}, workspace, {
    unitTests: [
      ...unitTests.slice(0, workspaceIndex),
      ...unitTests.slice(workspaceIndex + 1)
    ]
  })
}

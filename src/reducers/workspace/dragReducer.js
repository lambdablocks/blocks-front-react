import { bound } from '../../utils'
import { getConstant } from '../../components/constants'

export const updateElementInWorkspace = (workspace, payload) => {
  const { selectionState } = workspace

  if (!selectionState.dragStarted) {
    return workspace
  }

  const { currentMousePosition } = payload
  const { element } = selectionState
  const originalElement = workspace.entities[element.id]
  const parentElement = workspace.entities[originalElement.parentId]
  const margin = getConstant(parentElement.componentName, 'margin')

  const x = element.startPosition.x + currentMousePosition.x - element.mouseDownPosition.x
  const y = element.startPosition.y + currentMousePosition.y - element.mouseDownPosition.y

  return Object.assign({}, workspace, {
    ...workspace,
    entities: {
      ...workspace.entities,
      [element.id]: {
        ...originalElement,
        position: {
          x: bound(
            x,
            margin,
            parentElement.size.width - originalElement.size.width - margin
          ),
          y: bound(
            y,
            margin,
            parentElement.size.height - originalElement.size.height - margin
          )
        }
      }
    }
  })
}

export const addDragStartedToWorkspace = (workspace, payload) => {
  const {
    elementId,
    elementPosition,
    mousePosition
  } = payload

  return setDragStateToWorkspace(
    workspace,
    {
      dragStarted: true,
      element: {
        id: elementId,
        mouseDownPosition: mousePosition,
        startPosition: elementPosition
      }
    }
  )
}

export const addDragStoppedToWorkspace = (workspace, payload) => {
  return setDragStateToWorkspace(
    workspace,
    {
      dragStarted: false
    }
  )
}

export const setDragStateToWorkspace = (workspace, dragState) => {
  return Object.assign({}, workspace, {
    ...workspace,
    selectionState: {
      ...workspace.selectionState,
      ...dragState
    }
  })
}

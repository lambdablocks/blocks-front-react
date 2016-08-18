import { selectElement } from '../actions'
import { LEFT } from '../components/constants'

export * from './colors'
export * from './slotPosition'
export * from './slotSelection'

export const isNotEmpty = (object) => {
  return Object.keys(object).length > 0
}

export const handleSelectElement = (dispatch) => {
  return (elementId, mouseEvent, workspaceIndex) => {
    if (mouseEvent.button != LEFT)
      return

    dispatch(
      selectElement(
        elementId,
        { x: mouseEvent.pageX, y: mouseEvent.pageY },
        workspaceIndex
      )
    )
  }
}

export const unique = (array) => {
  return array.filter((() => {
    var seen = {}
    return (element, index, array) => !(element in seen) && (seen[element] = 1)
  })())
}

export const bound = (value, lowerLimit, upperLimit) => {
  if (value < lowerLimit) {
    return lowerLimit
  }
  if (value > upperLimit) {
    return upperLimit
  }

  return value
}

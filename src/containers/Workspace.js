import { connect } from 'react-redux'

import Workspace from '../components/Workspace'

const mapStateToProps = (state) => {
  const { entities, selectionState } = state.workspace
  let selectedElement = {}

  if(!selectionState.dragStarted)
    selectedElement = selectionState.element

  return {
    dragStarted: selectionState.dragStarted,
    mainBrick: entities[state.workspace.mainBrickId],
    selectedElement,
    unitTests: state.workspace.unitTests
  }
}

export default connect(mapStateToProps)(Workspace)

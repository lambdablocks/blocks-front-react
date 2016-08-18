import React, { PropTypes, Component } from 'react'
import throttle from 'lodash.throttle'

import { UNIT_TEST } from './constants'
import { isNotEmpty } from '../utils'
import { PositionPropTypes } from '../propTypes'

import SelectedElementDialog from '../containers/SelectedElementDialog'
import TestSummary from './TestSummary'
import Translate from './Translate'
import WorkspaceSurface from './WorkspaceSurface'

const styles = {
  WebkitUserSelect: 'none'
}

const workspaceHeaderStyles = {
  display: 'inline-block',
  marginRight: '30px'
}

const workspacesStyles = {
  display: 'flex'
}

export default const Workspace = React.createClass({
  propTypes: {
    dragStarted: PropTypes.bool.isRequired,
    initWorkspace: PropTypes.func.isRequired,
    mainBrick: PropTypes.object.isRequired,
    moveElement: PropTypes.func.isRequired,
    selectedElement: PropTypes.object.isRequired,
    selectedSlots: PropTypes.arrayOf(PropTypes.number).isRequired,
    selectElementOrStopDrag: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
    unitTests: PropTypes.array.isRequired
  },

  componentDidMount() {
    const {
      initWorkspace,
      type
    } = this.props

    initWorkspace(type)
  },

  render() {
    const {
      dragStarted,
      mainBrick,
      moveElement,
      selectedElement,
      selectedSlots,
      selectElementOrStopDrag,
      type,
      unitTests
    } = this.props
    let handleMouseMove, handleMouseUp

    if(dragStarted) {
      handleMouseMove = (e) => {
        moveElement({ x: e.pageX, y: e.pageY })
      }
      handleMouseUp = (e) => {
        selectElementOrStopDrag({ x: e.pageX, y: e.pageY })
      }
    }
    else {
      handleMouseMove = () => {}
      handleMouseUp = () => {}
    }

    return (
      <div
        id="workspace"
        onMouseMove={ throttle(handleMouseMove, 20) }
        onMouseUp={ handleMouseUp }
        style={ styles }
      >
        <div>
          <Translate
            childProps={ { style: workspaceHeaderStyles } }
            HtmlElement="h2"
            message="workspace"
          />
          { type == UNIT_TEST && <TestSummary unitTests={ unitTests } /> }
          <a href="https://github.com/lambdabricks/bricks-front-react">
            <img
              className="github-logo"
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
            />
          </a>
        </div>
        <div style={ workspacesStyles} >
          { unitTests.map((unitTest, index) => {
              return (
                <WorkspaceSurface
                  index={ index }
                  key={ index }
                  mainBrick={ mainBrick }
                  selectedSlots={ selectedSlots }
                  unitTest={ unitTest }
                />
              )
            })
          }
        </div>
        { isNotEmpty(selectedElement) &&
          <SelectedElementDialog { ...selectedElement } />
        }
      </div>
    )
  }
})

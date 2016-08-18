import { connect } from 'react-redux'
import { startDrag } from '../actions'
import { LEFT } from '../components/constants'

const mapDispatchToProps = (dispatch) => {
  return {
    handleMouseDown: (elementId, mouseEvent, elementPosition) => {
      if (mouseEvent.button != LEFT)
        return

      dispatch(
        startDrag(
          elementId,
          { x: mouseEvent.pageX, y: mouseEvent.pageY },
          elementPosition
        )
      )
    }
  }
}

export default connect(null, mapDispatchToProps)

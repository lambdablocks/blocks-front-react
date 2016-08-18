import React, { PropTypes } from 'react'

import DialogButton from './DialogButton'

const MainBrickDetails = React.createClass({
  propTypes: {
    addUnitTest: PropTypes.func.isRequired,
    deleteUnitTest: PropTypes.func.isRequired,
    totalUnitTests: PropTypes.number.isRequired,
    workspaceIndex: PropTypes.number.isRequired
  },

  render () {
    const {
      addUnitTest,
      deleteUnitTest,
      totalUnitTests,
      workspaceIndex
    } = this.props

    return (
      <div>
        <div>
          <DialogButton
            onClick={addUnitTest}
            message='addUnitTest'
          />
        </div>
        {totalUnitTests > 1 &&
          <div className='topMargin'>
            <DialogButton
              onClick={() => deleteUnitTest(workspaceIndex)}
              message='deleteUnitTest'
            />
          </div>
        }
      </div>
    )
  }
})

export default MainBrickDetails

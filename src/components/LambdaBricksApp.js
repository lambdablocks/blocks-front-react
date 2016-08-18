import React, { PropTypes } from 'react'

import { UNIT_TEST } from './constants'
import Library from '../containers/Library'
import Logo from './Logo'
import Workspace from '../containers/Workspace'

const LambdaBricksApp = React.createClass({
  getChildContext () {
    return {
      locale: 'en'
    }
  },

  childContextTypes: {
    locale: PropTypes.string.isRequired
  },

  defaultProps: {
    libraryId: '1',
    workspaceType: UNIT_TEST
  },

  propTypes: {
    libraryId: PropTypes.string.isRequired,
    workspaceType: PropTypes.string.isRequired
  },

  render () {
    return (
      <div className='app'>
        <Logo />
        <Library id={this.props.libraryId} />
        <Workspace type={this.props.workspaceType} />
      </div>
    )
  }
})

export default LambdaBricksApp

import React, { PropTypes, Component } from 'react'

import {
  getTestResultColor
} from '../utils/unitTestUtils'

const ulStyles = {
  display: 'inline-block',
  listStyleType: 'none',
  margin: 0,
  padding: 0
}

const liStyles = {
  border: '2px solid black',
  borderRadius: '3px',
  display: 'inline-block',
  height: '20px',
  marginRight: '5px',
  width: '20px'
}

const TestSummary = React.createClass({
  propTypes: {
    unitTests: PropTypes.arrayOf(
      PropTypes.shape({
        result: PropTypes.string.isRequired
      }).isRequired
    ).isRequired
  },

  render () {
    const {
      unitTests
    } = this.props

    return (
      <ul style={ ulStyles } >
        { unitTests.map((unitTest, index) =>
          <li
            key={ index }
            style={
              {
                ...liStyles,
                backgroundColor: getTestResultColor(unitTest)
              }
            }
          ></li>
        )}
      </ul>
    )
  }
})

export default TestSummary

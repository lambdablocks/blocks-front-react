import React, { Component, PropTypes } from 'react'

const Logo = React.createClass({
  render () {
    return (
      <div id="logo">
        <svg className="brick">
          <g transform="scale(0.6)">
            <rect x="0" y="15" width="75" height="30"></rect>
            <rect x="15" y="0" width="15" height="15"></rect>
            <rect x="45" y="0" width="15" height="15"></rect>
            <rect x="30" y="45" width="15" height="15"></rect>
          </g>
        </svg>
        Lambda Bricks
      </div>
    )
  }
})

export default Logo

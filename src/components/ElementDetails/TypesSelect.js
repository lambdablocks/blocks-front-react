import React, { PropTypes } from 'react'

import {
  PrimitivePropTypes
} from '../../propTypes'

import Translate from '../Translate'

const TypesSelect = React.createClass({
  propTypes: {
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    primitives: PropTypes.objectOf(PrimitivePropTypes).isRequired,
    type: PropTypes.string.isRequired,
    workspaceIndex: PropTypes.number
  },

  render () {
    const {
      handleChange,
      id,
      primitives,
      type,
      workspaceIndex
    } = this.props

    return (
      <div>
        <Translate
          HtmlElement='label'
          message='type'
        />
        <select
          value={type}
          onChange={(e) => handleChange(id, e, workspaceIndex)}
        >
          {}
          <Translate
            childProps={{ disabled: true, value: 'null' }}
            HtmlElement='option'
            message='empty'
          />

          {Object.keys(primitives).map((key) => {
            const primitive = primitives[key]

            return (
              <option
                key={primitive.id}
                value={primitive.type}
              >
              {primitive.label}
              </option>
            )
          }
          )}
        </select>
      </div>
    )
  }
})

export default TypesSelect

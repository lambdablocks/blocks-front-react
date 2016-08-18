import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

import {
  PrimitivePropTypes
} from '../../propTypes'

import { colors } from '../constants'
import Translate from '../Translate'

const CustomValueInput = React.createClass({
  propTypes: {
    closeDialog: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    primitives: PropTypes.objectOf(PrimitivePropTypes).isRequired,
    type: PropTypes.string.isRequired,
    value: PropTypes.string,
    workspaceIndex: PropTypes.number
  },

  componentDidMount () {
    if (this.refs.valueInput) {
      ReactDOM.findDOMNode(this.refs.valueInput).focus()
    }
  },

  closeOnEnterKeyDown (e) {
    if (e.key === 'Enter') {
      this.props.closeDialog()
    }
  },

  customInput () {
    const {
      handleChange,
      id,
      primitives,
      type,
      value,
      workspaceIndex
    } = this.props
    const primitive = primitives[type]

    if (primitive && primitive.values) {
      return (
        <span id='CustomValueInput'>
          {primitive.values.map((primitiveValue) =>
            <span key={primitiveValue.name}>
              <input
                onChange={(e) => handleChange(id, e, workspaceIndex)}
                id={primitiveValue.name}
                name='inputWithOptions'
                type='radio'
                value={primitiveValue.name}
                checked={primitiveValue.name === value}
              />
              <label
                htmlFor={primitiveValue.name}
                style={{ backgroundColor: colors[primitiveValue.name] }}
              >
                {primitiveValue.label}
              </label>
            </span>
          )}
        </span>
      )
    } else {
      const inputType = type === 'number' ? type : 'text'

      return (
        <input
          onChange={(e) => handleChange(id, e, workspaceIndex)}
          onKeyDown={this.closeOnEnterKeyDown}
          ref='valueInput'
          type={inputType}
          value={value}
        />
      )
    }
  },

  render () {
    return (
      <div>
        <Translate
          HtmlElement='label'
          message='value'
        />
        {this.customInput()}
      </div>
    )
  }
})

export default CustomValueInput

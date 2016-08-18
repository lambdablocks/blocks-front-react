import React, { PropTypes, Component } from 'react'

import Module from './Module'
import { PrimitivePropTypes } from '../propTypes'
import Translate from './Translate'

const Library = React.createClass({
  propTypes: {
    fetchLibrary: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    isFetching: PropTypes.bool.isRequired,
    items: PropTypes.shape({
      modules: PropTypes.array,
      primitives: PropTypes.objectOf(PrimitivePropTypes)
    }).isRequired,
    onFunctionClick: PropTypes.func.isRequired,
    onPrimitiveClick: PropTypes.func.isRequired
  },

  componentDidMount () {
    const { fetchLibrary, id } = this.props
    fetchLibrary(id)
  },

  render () {
    const {
      isFetching,
      items,
      onFunctionClick,
      onPrimitiveClick
    } = this.props

    return (
      <aside id="library">
        <Translate
          HtmlElement="h2"
          message="library"
        />
        { isFetching &&
          <Translate
            HtmlElement="h3"
            message="loading"
          />
        }
        { !isFetching && items.primitives &&
          <div className="nav">
            <div id="constants">
              <Translate
                HtmlElement="h3"
                message="constants"
              />
              <ul>
                { Object.keys(items.primitives).map((key) => {
                    const primitive = items.primitives[key]

                    return (
                      <li
                        key={ primitive.id }
                        onClick={ () => onPrimitiveClick(primitive.type) }
                      >
                        {primitive.label}
                      </li>
                    )
                  }
                )}
              </ul>
            </div>
            <div id="functions">
              <Translate
                HtmlElement="h3"
                message="functions"
              />
              { items.modules.map((module) =>
                <Module
                  key={ module.name }
                  onFunctionClick={ onFunctionClick }
                  { ...module }
                />
              )}
            </div>
          </div>
        }
      </aside>
    )
  }
})

export default Library;

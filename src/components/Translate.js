import React, { PropTypes } from 'react'

import { getMessage } from '../utils/translationUtils'

const Translate = React.createClass({
  contextTypes: {
    locale: PropTypes.string.isRequired
  },

  propTypes: {
    childProps: PropTypes.object,
    HtmlElement: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  },

  render () {
    const {
      childProps,
      HtmlElement,
      message
    } = this.props
    const { locale } = this.context

    return (
      <HtmlElement {...childProps} >
        {getMessage(locale, message)}
      </HtmlElement>
    )
  }
})

export default Translate

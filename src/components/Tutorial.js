import React, { Component, PropTypes } from 'react'
import JoyRide from 'react-joyride'

import { getMessage } from '../utils/translationUtils'
import {
  getTutorialConfig,
  totalSteps
} from './tutorialSteps'

import Library from '../containers/Library'
import Logo from './Logo'
import Translate from './Translate'
import Workspace from '../containers/Workspace'

export default const Tutorial = React.createClass({
  /*!
   * Required stuff
   */

  childContextTypes: {
    locale: PropTypes.string.isRequired
  },

  propTypes: {
    locale: PropTypes.string.isRequired,
    step: PropTypes.number.isRequired
  },

  /*!
   * Initial values
   */

  getInitialState () {
    return {
      joyrideOverlay: true,
      joyrideType: 'continuous',
      ready: false,
      showStepsProgress: false,
      joyrideSteps: [
        {
          text: getMessage(props.locale, 'joyrideSteps.window'),
          selector: '#window',
          position: 'top'
        },
        {
          text: getMessage(props.locale, 'joyrideSteps.library'),
          selector: '#library',
          position: 'right'
        },
        {
          text: getMessage(props.locale, 'joyrideSteps.constants'),
          selector: '#constants',
          position: 'right'
        },
        {
          text: getMessage(props.locale, 'joyrideSteps.functions'),
          selector: '#functions',
          position: 'right'
        },
        {
          text: getMessage(props.locale, 'joyrideSteps.workspace'),
          selector: '#workspace',
          position: 'left'
        },
        {
          text: getMessage(props.locale, 'joyrideSteps.tutorial'),
          selector: '#instructions',
          position: 'right'
        }
      ]
    }
  },

  getDefaultProps () {
    return {
      step: 1
    }
  },

  getChildContext () {
    return {
      locale: this.props.locale
    }
  },

  /*!
   * Lyfe-cycle events
   */

  componentDidMount() {
    this.setState({
      ready: getTutorialConfig(this.props.step).openSiteTourAtStart
    })
  },

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.ready && this.state.ready) {
      this.refs.joyride.start(true)
    }
  },

  render() {
    const { locale, step } = this.props
    const nextStep = step + 1
    const tutorialConfig = getTutorialConfig(step)
    const state = this.state

    return (
      <div className="tutorial app" id="window">
        <Logo />
        <div id="instructions">
          <Translate
            HtmlElement="h2"
            message="tutorial"
          />
          <h3>{ step } / { totalSteps() }</h3>
          <div
            dangerouslySetInnerHTML={
              { __html: getMessage(locale, `tutorialSteps.${step}`) }
            }
          />
          { getMessage(locale, `tutorialSteps.${nextStep}`) && <Translate
            HtmlElement="a"
            childProps={ { href: `./?step=${nextStep}` } }
            message="next"
          /> }
        </div>
        <Library id={ tutorialConfig.libraryId } />
        <Workspace type={ tutorialConfig.worspaceType } />
        <JoyRide
          ref="joyride"
          debug={ false }
          steps={ state.joyrideSteps }
          type={ state.joyrideType }
          showSkipButton={ false }
          showStepsProgress={ state.showStepsProgress }
          showOverlay={ state.joyrideOverlay }
        />
      </div>
    )
  }
})

'use strict'

import 'babel-core/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import LambdaBricksApp from './components/LambdaBricksApp'
import configureStore from './store/configureStore'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <LambdaBricksApp />
  </Provider>,
  document.getElementById('main')
)

import { parse } from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import Tutorial from './components/Tutorial'
import configureStore from './store/configureStore'

const store = configureStore()
const params = parse(location.search)
const step = parseInt(params['step']) || 1

ReactDOM.render(
  <Provider store={store}>
    <Tutorial
      locale='en'
      step={step}
    />
  </Provider>,
  document.getElementById('main')
)

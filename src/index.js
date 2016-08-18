import { parse } from 'query-string'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import LambdaBricksApp from './components/LambdaBricksApp'
import configureStore from './store/configureStore'

const store = configureStore()
const params = parse(location.search)

ReactDOM.render(
  <Provider store={store}>
    <LambdaBricksApp
      libraryId={params['id']}
      workspaceType={params['ws']}
    />
  </Provider>,
  document.getElementById('main')
)

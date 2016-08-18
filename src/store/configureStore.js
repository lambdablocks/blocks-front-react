import { applyMiddleware, compose, createStore } from 'redux'
import { batchedSubscribe } from 'redux-batched-subscribe'
import { unstable_batchedUpdates as batchedUpdates } from 'react-dom'
import thunkMiddleware from 'redux-thunk'

import rootReducer from '../reducers'

const middleware = compose(
  applyMiddleware(thunkMiddleware),
  batchedSubscribe(batchedUpdates)
)

const finalCreateStore = middleware(createStore)

export default function configureStore (initialState) {
  return finalCreateStore(rootReducer, initialState)
}

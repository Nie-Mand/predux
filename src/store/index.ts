// import { createStore, applyMiddleware } from 'redux'
// import { composeWithDevTools } from '@redux-devtools/extension'
// import { reducer, saga, routerMiddleware, createReduxHistory } from './config'

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(sagaMiddleware, routerMiddleware))
// )

// export const history = createReduxHistory(store)

// export default store

import createSagaMiddleware from 'redux-saga'
import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import * as reducers from './reducers'
import { all } from 'redux-saga/effects'
import * as sagas from './sagas'
import {
  routerReducer as router,
  routerMiddleware,
  createReduxHistory,
} from './router'

const sagaMiddleware = createSagaMiddleware()

const reducer = combineReducers({
  counter: reducers.counterReducer,
  user: reducers.userReducer,
  router,
})

const store = configureStore({
  reducer,
  middleware: [routerMiddleware, sagaMiddleware],
})

sagaMiddleware.run(function* saga() {
  yield all([...Object.values(sagas).map(saga => saga())])
})

export const history = createReduxHistory(store)

export default store

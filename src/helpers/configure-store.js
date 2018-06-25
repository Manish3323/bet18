import { createLogger } from 'redux-logger'
import promise from 'redux-promise'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import reducer from '../reducers'
import { middleware } from '../AppNavigator'
const middlewares = []

middlewares.push(middleware)
middlewares.push(promise)
middlewares.push(thunk)

export default function configureStore (initialState) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger({collapsed: true}))
  }
  const enhancer = compose(
    applyMiddleware(...middlewares)
  )

  const store = createStore(
    reducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}

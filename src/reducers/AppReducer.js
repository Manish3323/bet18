import { ROOT_CHANGED } from '../actions/types'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  root: undefined // 'login' / 'after-login'
})

export default function app (state = initialState, action = {}) {
  switch (action.type) {
    case ROOT_CHANGED:
      return state.merge({
        root: action.root
      })
    default:
      return state
  }
}

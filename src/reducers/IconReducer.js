import { ADD_ICON } from '../actions/types'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
  root: {} // 'login' / 'after-login'
})

export default function icons (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_ICON:
      return state.merge({
        icons: action.icons
      })
    default:
      return state
  }
}

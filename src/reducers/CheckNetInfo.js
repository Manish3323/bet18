import { CHECK_NET_INFO } from '../actions/types'

const defaultState = true

/**
 * @return {boolean}
 */
export default function NetInfoReducer (state = defaultState, action = {}) {
  switch (action.type) {
    case CHECK_NET_INFO:
      return action.payload
    default:
      return state
  }
}

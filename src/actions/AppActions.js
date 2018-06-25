import { NetInfo } from 'react-native'
import { CHECK_NET_INFO, ADD_ICON, ROOT_CHANGED } from './types'

export function appInitialized () {
  return async function (dispatch, getState) {
    let startRoot = 'login'
    console.log('app initailized')
    if (getState().Auth.user) {
      startRoot = 'after-login'
    }
    console.log('calling funcs')
    dispatch(checkNetInfo())
    dispatch(changeAppRoot(startRoot))
  }
}

export function checkNetInfo () {
  let request = NetInfo.isConnected.fetch()
  return {
    type: CHECK_NET_INFO,
    payload: request
  }
}

export function addIcon (icons) {
  return {
    type: ADD_ICON,
    icons
  }
}

export function changeAppRoot (root) {
  return {
    type: ROOT_CHANGED,
    root: root
  }
}

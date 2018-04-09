import { NetInfo } from 'react-native'
import { CHECK_NET_INFO, ADD_ICON, ROOT_CHANGED } from './types'
import Icon from 'react-native-vector-icons/MaterialIcons'

export function appInitialized () {
  return async function (dispatch, getState) {
    let startRoot = 'login'
    // since all business logic should be inside redux actions
    // this is a good place to put your app initialization code
    if (getState().Auth.user) {
      startRoot = 'after-login'
    }
    console.log('calling funcs')
    var icons = {
      dashboard: await Icon.getImageSource('home', 30, '#f34'),
      home: await Icon.getImageSource('home', 30, '#f34'),
      menu: await Icon.getImageSource('menu', 30, '#f34')
    }
    dispatch(checkNetInfo())
    dispatch(addIcon(icons))
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

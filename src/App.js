import React, { Component } from 'react'
import { Dimensions, View } from 'react-native'
import { Provider } from 'react-redux'
import * as appActions from './actions/AppActions'
import * as AuthActions from './actions/AuthAction'
import configureStore from './helpers/configure-store'
import { AppNavigator, RootNavigator } from './AppNavigator'
import { screens } from './Screens'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyDuMWWsXCJ9yVMdjLPoN6h9KYAL6mTtDiU',
  authDomain: 'bet18-9fada.firebaseapp.com',
  databaseURL: 'https://bet18-9fada.firebaseio.com',
  projectId: 'bet18-9fada',
  storageBucket: 'bet18-9fada.appspot.com',
  messagingSenderId: '170655201334'
}
export const state = window.__initialState
export const store = configureStore(state)

class App extends Component {
  constructor () {
    super()
    firebase.initializeApp(config)
    store.subscribe(this.onStoreUpdate.bind(this))
    store.dispatch(appActions.appInitialized())
    AuthActions.checkIfAlreadyLogin()
  }

  onStoreUpdate () {
    let {root} = store.getState().app
    const user = store.getState().Auth.user
    if (!user) {
      root = 'login'
    } else {
      root = 'after-login'
    }

    if (this.currentRoot !== root && root) {
      this.currentRoot = root
      store.dispatch(appActions.changeAppRoot(root))
    }
  }
  render () {
    return (
      <Provider store={store}>
        <RootNavigator/>
      </Provider>
    )
  }
}

export default App

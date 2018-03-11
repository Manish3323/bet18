import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import * as appActions from './actions/AppActions'
import configureStore from './helpers/configure-store'
import { registerScreens } from './Screens'

const state = window.__initialState
const store = configureStore(state)

// screen related book keeping
registerScreens(store, Provider)

class App extends Component {
  constructor () {
    super()
    // since react-redux only works on components, we need to subscribe this class manually
    store.subscribe(this.onStoreUpdate.bind(this))
    store.dispatch(appActions.appInitialized())
  }

  onStoreUpdate () {
    let {root} = store.getState().app
    let {icons} = store.getState().icon
    const user = store.getState().Auth.user

    if (!user && root !== 'register') {
      root = 'login'
    } else {
      root = 'after-login'
    }

    if (this.currentRoot !== root && root) {
      this.currentRoot = root
      this.startApp(root, icons)
    }
  }

  startApp (root, icons) {
    switch (root) {
      case 'login':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'LoginScreen',
            title: 'Login',
            label: 'Bet 18',
            icon: icons.home,
            navigatorStyle: {
              drawUnderNavBar: false,
              navBarHidden: true,
              statusBarTextColorScheme: 'light'
            }
          }
        })
        return
      case 'register':
        Navigation.startSingleScreenApp({
          screen: {
            screen: 'LoginScreen',
            title: 'register',
            icon: icons.home,
            label: 'Bet 18',
            navigatorStyle: {
              drawUnderNavBar: false,
              navBarHidden: true,
              statusBarTextColorScheme: 'dark'
            }
          }
        })
        return
      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Bet 18',
              screen: 'dashboard',
              icon: icons.home,
              title: 'Bet 18',
              navigatorStyle: {
                drawUnderNavBar: false,
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: '#2D343D',
                statusBarTextColorScheme: 'light'
              }
            },
            {
              label: 'Menu',
              screen: 'drawerScreen',
              icon: icons.menu,
              navigatorStyle: {
                drawUnderNavBar: false,
                navBarTextColor: '#ffffff',
                navBarBackgroundColor: '#2D343D',
              }
            }
          ],
          drawer: {
            left: { // optional, define if you want a drawer from the left
              screen: 'drawerScreen', // unique ID registered with Navigation.registerScreen
              passProps: {}, // simple serializable object that will pass as props to all top screens (optional),
              fixedWidth: 700 // a fixed width you want your left drawer to have (optional)
            },
            style:{
              contentOverlayColor: 'rgba( 255, 255, 0, 1)'
            },
            animationType: 'door', 
            disableOpenGesture: true
          },
          animationType: 'slide-down',
          title: 'BET-18',
          tabsStyle: { 
            tabBarButtonColor: '#2D343D',
          }
        })
        return
      default:
        console.error('Unknown app root')
    }
  }
}

export default App

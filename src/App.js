import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { Navigation } from 'react-native-navigation'
import * as appActions from './actions/AppActions'
import configureStore from './helpers/configure-store'
import { registerScreens } from './Screens'

export const state = window.__initialState
export const store = configureStore(state)

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

    if (!user) {
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
      case 'after-login':
        Navigation.startTabBasedApp({
          tabs: [
            {
              label: 'Home',
              screen: 'dashboard',
              icon: icons.home,
              title: 'Bet 18'
            },
            {
              label: 'Menu',
              screen: 'drawerScreen',
              icon: icons.menu,
              title: 'Menu'
            }
          ],
          drawer: {
            left: { // optional, define if you want a drawer from the left
              screen: 'drawerScreen', // unique ID registered with Navigation.registerScreen
              fixedWidth: 700 // a fixed width you want your left drawer to have (optional)
            },
            style: {
              contentOverlayColor: 'rgba( 255, 255, 0, 1)'
            },
            animationType: 'door',
            disableOpenGesture: true
          },
          animationType: 'slide-down',
          appStyle: {
            tabBarButtonColor: '#bfbfbf',
            tabBarHidden: false, // make the tab bar hidden
            tabBarSelectedButtonColor: '#b3fff0', // change the color of the selected tab icon and text (only selected)
            tabBarBackgroundColor: '#006652', // change the background color of the tab bar
            tabBarTranslucent: false, // change the translucent of the tab bar to false
            forceTitlesDisplay: true, // Android only. If true - Show all bottom tab labels. If false - only the selected tab's label is visible.
            tabBarHideShadow: false, //
            drawUnderNavBar: false,
            navBarTextColor: '#ffffff',
            navBarBackgroundColor: '#006652'

          }
        })
        return
      default:
        console.error('Unknown app root')
    }
  }
}

export default App

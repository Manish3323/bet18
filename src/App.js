import React, { Component } from 'react'
import RootComponent from './components/RootComponent'
import { View } from 'react-native'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import ReduxThunk from 'redux-thunk'
import firebase from 'firebase'

class App extends Component {
  componentWillMount () {
    // Initialize Firebase
    var config = {
      apiKey: 'AIzaSyDuMWWsXCJ9yVMdjLPoN6h9KYAL6mTtDiU',
      authDomain: 'bet18-9fada.firebaseapp.com',
      databaseURL: 'https://bet18-9fada.firebaseio.com',
      projectId: 'bet18-9fada',
      storageBucket: 'bet18-9fada.appspot.com',
      messagingSenderId: '170655201334'
    }
    firebase.initializeApp(config)
  }
  render () {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <View style={{ flex: 1 }}>
          <RootComponent />
        </View>
      </Provider>
    )
  }
}

export default App

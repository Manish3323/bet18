import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Router from '../Router'

class RootComponent extends Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
        <Router />
      </View>
    )
  }
}

export default RootComponent

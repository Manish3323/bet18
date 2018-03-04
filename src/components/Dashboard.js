import React, { Component } from 'react'
import { View, Text } from 'react-native'
import MatchesList from './MatchesList'

export default class DashBoard extends Component {
  render () {
    return (
      <View style={{flex: 1}}>
        <MatchesList />
      </View>
    )
  }
}

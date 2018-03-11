// your entry point

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import { Card } from '../common'
import { CardSection } from './CardSection';
class ContextMenu extends Component {
  render () {
    const { viewStyle, iconStyle, cardStyle } = styles
    return (
      <View style={viewStyle}>
        <Card style={ cardStyle }>
          <CardSection>
            <Text> My Predictions</Text>
          </CardSection>
        </Card>
        <Card style={ cardStyle }>
          <CardSection>
            <Text> LeaderBoard </Text>
          </CardSection>
        </Card>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewStyle:{
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop:50,
    marginBottom:50,
  },
  iconStyle: {
    marginLeft: 50
  },
  cardStyle:{
    marginLeft: 50
  }
})

export { ContextMenu }

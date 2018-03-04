import React from 'react'
import { View, Left, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'

const Header = ({ headerText, onHomePress }) => {
  const { textStyle, viewStyle, iconStyle } = styles
  return (
    <View style = { viewStyle }>
      <TouchableOpacity onPress = { onHomePress }>
        <Icon style={ iconStyle } name="menu"/>
      </TouchableOpacity>
      <Text style = { textStyle }> { headerText } </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: 'fifawelcome1.3',
    color: 'red',
    alignSelf: 'center',
    alignItems: 'flex-end'
  },
  iconStyle: {
    alignSelf: 'flex-start',
    marginLeft: 10

  },
  viewStyle: {
    backgroundColor: '#E5E8E8',
    height: 40,
    paddingTop: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 200 },
    shadowOpacity: 0.7,
    elevation: 2,
    position: 'relative',
    flexDirection: 'row'
  }

})

export { Header }

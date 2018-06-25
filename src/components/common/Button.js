import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'

const Button = ({ onPress, buttontext, bStyle }) => {
  const { buttonStyle, textStyle } = styles
  return (
    <TouchableOpacity onPress = { onPress } style = { [buttonStyle, bStyle] } >
      <Text style = { textStyle } > { buttontext } </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    alignSelf: 'auto',
    backgroundColor: '#ABB2B9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5,
    position: 'relative'
  },
  textStyle: {
    alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  }
})

export { Button }

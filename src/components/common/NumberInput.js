import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'

const NumberInput = (props) => {
  const { style, onChangeText, value, defaultValue } = props
  return (
    <View style={style}>
      <TextInput style={{textAlign: 'center'}} defaultValue={defaultValue} keyboardType='numeric' value={value} onChangeText={onChangeText}/>
    </View>
  )
}
const MobileInput = (props) => {
  const { onChangeText, value, label, propsLabelstyle, defaultValue, placeholder } = props
  const { labelStyle, inputStyle, containerStyle } = styles
  return (
    <View style={containerStyle}>
      <Text style={ [ labelStyle, propsLabelstyle ]}>
        {label}
      </Text>
      <TextInput style={inputStyle} label={label} placeholder={placeholder} defaultValue={defaultValue} keyboardType='numeric' value={value} onChangeText={onChangeText}/>
    </View>
  )
}
const styles = StyleSheet.create({
  inputStyle: {
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
    textAlign: 'center'
  },
  labelStyle: {
    fontSize: 18,
    paddingRight: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
})

export { NumberInput, MobileInput }

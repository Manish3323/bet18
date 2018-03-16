import React from 'react'
import { TextInput, View } from 'react-native'

const NumberInput = (props) => {
  const { style,onChangeText, value, defaultValue } = props
  return (
    <View style={style}>
      <TextInput defaultValue={defaultValue} keyboardType='numeric' value={value} onChangeText={onChangeText}/>
    </View>
  )
}

export { NumberInput }

import React from 'react'
import { TextInput, View, Text, StyleSheet } from 'react-native'

const Input = (props) => {
  const { password, label, propsLabelstyle, placeholder, value, onChangeText } = props
  const { containerStyle, labelStyle, inputStyle } = styles
  return (
    <View style={ containerStyle }>
      <Text style={ [ labelStyle, propsLabelstyle ]}>
        {label}
      </Text>
      <TextInput secureTextEntry={password} placeholder={placeholder} autoCorrect={ false } style={ inputStyle } value={ value } onChangeText={ onChangeText } />
    </View>
  )
}

const styles = StyleSheet.create({
  inputStyle: {
    color: '#111',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
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
export { Input }

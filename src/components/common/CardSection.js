import React from 'react'
import { View, StyleSheet } from 'react-native'

const CardSection = ({children, cardSectionStyle}) => {
  return (
    <View style={ [styles.containerStyle, cardSectionStyle] }>
      { children }
    </View>
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
})
export { CardSection }

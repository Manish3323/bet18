import React, { Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Card, CardSection } from '../common'

class UserComponent extends Component {
  render () {
    const { key, firstName, displayName, containerStyle, user, onPress } = props
    const predictions = user['predictions'] || []
    return (
      <View>
        <Card>
          <TouchableOpacity onPress={onPress(key)}>
            <CardSection cardSectionStyle={containerStyle}>
              <Text>{displayName || firstName + ' with Points : ' +this. getPoints(predictions)}</Text>
            </CardSection>
          </TouchableOpacity>
        </Card>
      </View>
    )
  }

  getPoints = (arr) => {
    let sum = 0
      arr.map((prediction) => {
      sum += prediction['points']
    })
    return sum
  }

}
export { UserComponent }

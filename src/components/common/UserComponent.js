import React from 'react'
import { Text } from 'react-native'
import { Card, CardSection } from '../common'

const UserComponent = (props) => {
  return (
    <Card>
      <CardSection>
        <Text>{props.key}</Text>
      </CardSection>
    </Card>
  )
}

export { UserComponent }
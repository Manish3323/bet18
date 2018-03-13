// your entry point

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Card, CardSection } from '../common'
import { ROOT_CHANGED } from '../../actions/types'
import { changeAppRoot, logoutAction } from '../../actions'

class ContextMenu extends Component {
  onButtonPress = () => {
    this.props.logoutAction();
    this.props.changeAppRoot('login')
  }
  render () {
    const { viewStyle, cardStyle, logoutCard } = styles
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
        <Card style={ logoutCard }>
          <CardSection>
            <TouchableOpacity onPress={this.onButtonPress.bind(this)}>
              <Text> Logout </Text>
            </TouchableOpacity>
          </CardSection>
        </Card>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  viewStyle:{
    flexDirection: 'column',
    backgroundColor: 'rgba(255,255,255,0.6)',
    marginTop: 50,
    marginBottom: 50
  },
  iconStyle: {
    marginLeft: 50
  },
  cardStyle:{
    marginLeft: 50
  },
  logoutCard:{
    alignSelf:'flex-end'  
  }

})

export default connect(null,{ changeAppRoot,logoutAction })(ContextMenu)

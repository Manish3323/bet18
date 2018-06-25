import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Card, CardSection } from './common'
import {connect} from 'react-redux'
import { Spinner } from './common/Spinner'
import { orderBykey } from '../Utility'
class LeaderBoard extends Component {
  constructor (props) {
    super(props)
  }
  onNavigatorEvent (event) {
    if (event.id === 'bottomTabSelected' || event.id === 'bottomTabReSelected') {
      this.props.navigator.resetTo({
        animated: true,
        animationType: 'fade',
        screen: 'drawerScreen',
        navigatorStyle: {
          drawUnderNavBar: false,
          navBarTextColor: '#ffffff',
          navBarBackgroundColor: '#006652'
        }
      })
    }
  }
  getBackground (index) {
    return index % 2 === 0 ? '#b3d9ff' : '#4da6ff' 
  }
  renderList () {
    return this.props.users.map((userBean,i) => {
      const { key, firstName, displayName, containerStyle, user, totalPoints } = userBean
     
      return (
        <View key={key}>
         
          <Card>
            <TouchableOpacity onPress={()=>console.log(key)}>
            <CardSection cardSectionStyle={{justifyContent:'space-between',backgroundColor:this.getBackground(this.props.users.indexOf(userBean))}}>
                <Text >{++i}</Text>
                <Text>{firstName}</Text>
                <Text >{totalPoints}</Text>
              </CardSection>
            </TouchableOpacity>
          </Card>
        </View>
      )
    })
  }

  onUserClick = () => {
    return null
  }
  render () {
    if (this.props.users !== undefined && this.props.users.length > 0) {
      return (
        <View style={{flex:1}}>
          <Card>
            <CardSection cardSectionStyle={{justifyContent:'space-between'}}>
              <Text>Rank</Text>
              <Text>User </Text>
              <Text>Total Points</Text>
            </CardSection>
          </Card>
          <View style={{flex:1}}>
              {this.renderList()}
          </View>
        </View>
      )
    } else {
      return <Spinner size="large"/>
    }
  }
}
const stateMapToProps = (state) => {
  let { users } = state.Game
  users = orderBykey(users,['totalPoints','firstName'],['desc','asc']) // order of keys matters 
  return { users }
}
export default connect(stateMapToProps, {})(LeaderBoard)

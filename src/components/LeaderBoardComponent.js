import React, { Component } from 'react'
import { Text } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { Card, CardSection, UserComponent } from './common'
import {connect} from 'react-redux'
import { Spinner } from './common/Spinner'

class LeaderBoard extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
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
    return <List>
      {this.renderSingleComponent()}
    </List>
  }
  renderSingleComponent () {
    return this.props.users.map((user, i) => {
      const { key } = user
      return <ListItem key={key} containerStyle={{backgroundColor: this.getBackground(i)}}
        title={key} onPress={() => console.log('user')} Component={UserComponent}>
      </ListItem>
    })
  }

  render () {
    if (this.props.users !== undefined && this.props.users.length > 0) {
      return (
        this.renderList()
      )
    } else {
      return <Spinner size="large"/>
    }
  }
}
const stateMapToProps = (state) => {
  const { users } = state.Game
  return { users }
}
export default connect(stateMapToProps, {})(LeaderBoard)

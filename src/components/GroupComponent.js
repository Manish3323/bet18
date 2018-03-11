import React, { Component } from 'react'
import { View } from 'react-native'
import { ObjectsToArray } from '../Utility'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectGroupCode } from '../actions/GameAction'

class GroupList extends Component {
  componentWillMount () {
    this.dataSource = groupCodes
  }
  onRowSelect (groupCode) {
    this.props.selectGroupCode(groupCode)
    this.props.navigator.push({
      screen: 'MatchesList',
      title: 'Matches In Group '+groupCode.toUpperCase()
    })
  }
  renderList () {
    return (
      this.dataSource.map((groupCode) => {
        return <ListItem key={ groupCode } title= { 'Group : ' + groupCode.toUpperCase() + ' Matches' } onPress = { this.onRowSelect.bind(this, groupCode) } />
      })
    )
  }
  render () {
    return (
      <List>
        {this.renderList()}
      </List>
    )
  }
}

export default connect(null, {selectGroupCode})(GroupList)
const groupCodes = [
    'a': 'A',
    'b': 'B',
    'c': 'C',
    'd': 'D',
    'e': 'E',
    'f': 'F',
    'g': 'G',
    'h': 'H'
]

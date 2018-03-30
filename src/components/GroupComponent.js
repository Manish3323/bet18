import React, { Component } from 'react'
import { View } from 'react-native'
import { ObjectsToArray } from '../Utility'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectGroupCode, loadTeams, loadPredictions,loadUsers } from '../actions/GameAction'

class GroupList extends Component {
  componentWillMount () {
    this.dataSource = groupCodes
    this.props.loadTeams()
    this.props.loadPredictions()
    this.props.loadUsers()
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
    if(!this.props.loading) {
      return (
        <List>
          {this.renderList()}
        </List>
      )
    } else {
      return(
        <Spinner size='large'/>
      )
    }
  }
  mapStateToProps = (state) => {
    return { loading } = state.Game 
  }
}


export default connect(mapStateToProps, {selectGroupCode,loadTeams,loadPredictions,loadUsers })(GroupList)
const groupCodes = [
    'a',
    'b',
    'c',
    'd',
    'e',
    'f',
    'g',
    'h'
]

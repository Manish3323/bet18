import React, { Component } from 'react'
import { View } from 'react-native'
import { ObjectsToArray } from '../Utility'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectGroupCode, loadTeams, loadPredictions } from '../actions/GameAction'

class GroupList extends Component {
  componentWillMount () {
    this.dataSource = groupCodes
    this.props.loadTeams()
    this.props.loadPredictions()
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


export default connect(mapStateToProps, {selectGroupCode,loadTeams,loadPredictions })(GroupList)
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

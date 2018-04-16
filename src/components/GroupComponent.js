import React, { Component } from 'react'
import { View } from 'react-native'
import { ObjectsToArray } from '../Utility'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { selectGroupCode, loadTeams, loadPredictions,loadUsers,calculatePoints } from '../actions/GameAction'
import { GROUPLIST } from '../actions/StyleAction'
import { fetchApiData, fetchLiveData } from '../helpers/fetchRealTime'
import { groupCodes } from '../actions/types'

class GroupList extends Component {
  async componentWillMount () {
    this.dataSource = groupCodes
    fetchLiveData()
    await this.props.loadTeams()
    await this.props.loadPredictions()
    await this.props.loadUsers()
    await this.props.calculatePoints()
  }
  onRowSelect (groupCode) {
    this.props.selectGroupCode(groupCode)
    this.props.navigator.push({
      screen: 'MatchesList',
      title: 'Matches In Group '+groupCode.toUpperCase()
    })
  }
  getBackground(index){
    return index % 2 === 0 ? '#b3d9ff' : '#4da6ff' // this.getBackground(this.dataSource.indexOf(groupCode))
  }
  renderList () {
    return (
      this.dataSource.map((groupCode) => {
        return <ListItem containerStyle={{backgroundColor:this.getBackground(this.dataSource.indexOf(groupCode))}} key={ groupCode } title= { 'Group : ' + groupCode.toUpperCase() + ' Matches' } onPress = { this.onRowSelect.bind(this, groupCode) } />
      })
    )
  }
  render () {
      return (
       <View style={{flex:1,backgroundColor:'#fff'}}> 
        <List>
          {this.renderList()}
        </List>
        </View>
      )
  }
  mapStateToProps = (state) => {
    return state.Game 
  }
}


export default connect(mapStateToProps, {selectGroupCode,loadTeams,loadPredictions,loadUsers,calculatePoints })(GroupList)


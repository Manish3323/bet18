import React, { Component } from 'react'
import { View,Text ,StyleSheet , TouchableOpacity, Image, ListView,ScrollView } from 'react-native'
import {  getImage,ObjectsToArray, findByProp, cloneDeep, convertDateTimeToDate, convertDateTimeToTime } from '../Utility'
import { List, ListItem, Card } from 'react-native-elements'
import MaterialTabs from 'react-native-material-tabs'
import { connect } from 'react-redux'
import { selectGroupCode, loadTeams,setLiveData,loadPredictions,loadUsers,calculatePoints, loadGames, selectGame } from '../actions/GameAction'
import { GROUPLIST } from '../actions/StyleAction'
import { fetchApiData, fetchLiveData } from '../helpers/fetchRealTime'
import { groupCodes } from '../actions/types'
import { CardSection } from './common'
import { ListStyles } from '../styles/ListStyle'
import GameComponent from './GameComponent'
import { Spinner } from './common'
import FeedComponent from './FeedComponent';
// import MaterialTabs from 'react-native-material-tabs';

class GroupList extends Component {
  state = {
    selectedTab: 0,
    dataSource: []
  }
  async componentWillMount () {
  
    if (this.state.matches !== undefined && this.state.matches && this.state.matches.length > 0) {
      await this.wrapUpProperties()
    } else {
      await this.props.loadGames({groupCode: '', matchId: ''})
    }
    await this.props.loadTeams()
    await this.props.loadPredictions()
    await this.props.loadUsers()
    await fetchLiveData()
  }
  componentWillReceiveProps(){
     this.wrapUpProperties()
  }
  
  groupsArray = ['A', 'B', 'C', 'D','E','F','G']

  getBackground(index) {
    return index % 2 === 0 ? '#b3d9ff' : '#4da6ff' // this.getBackground(this.dataSource.indexOf(groupCode))
  }
  renderTabs () {
    return (
      <MaterialTabs  items={this.groupsArray}
      selectedIndex={this.state.selectedTab}
      onChange={(index) => { 
                      this.props.selectGroupCode(index)
                      this.setState({selectedTab:index});
                  }}
      barColor="#1fbcd2"
      indicatorColor="#fffe94"
      activeTextColor="white"
      textStyle={{ fontFamily: 'Papyrus' }}/>
    )
  }
   
  render () {
      return (
       <ScrollView style={{flex:1,backgroundColor:'#fff'}}> 
       <List>
        <Text style={{alignSelf:'center'}}>Matches</Text> 
        {this.renderTabs()}
       </List>
        {this.renderMatchList()}
        
           <FeedComponent />
          
        </ScrollView>
      )
  }
  
  renderMatchList(){
    const { listStyle } = ListStyles
    if (this.state.dataSource !== undefined && this.state.dataSource.length > 0) {
      return (
        <View style = {{flex: 1, backgroundColor: '#fff'}}>
          <List style={ listStyle }>
            <Text style={{alignSelf:'center'}}>Groups</Text>
            {this.renderList()}
          </List>
        </View>
      )
    } else {
      return (<Spinner size="large"/>)
    }
  }

  renderList () {
    return (
      this.state.dataSource.map((match, id) => {
        const { matchId, date, time, homeTeam, awayTeam } = match
        const homeIcon = getImage(homeTeam.iso2)
        const awayIcon = getImage(awayTeam.iso2)
        return (<ListItem containerStyle={ {backgroundColor: this.getBackground(this.state.dataSource.indexOf(match))}} key={matchId}
          title={
            <View style={{flexDirection: 'row'}}>
              <Text> {'Match : ' + matchId}</Text>
              <View style={{alignItems: 'center', flexDirection: 'row', marginRight: 50}}>
                <Image source={ homeIcon } style={{height: 20, width: 20}}/>
                <Text> {' : '}</Text>
                <Image source={ awayIcon } style={{height: 20, width: 20}}/>
              </View>
            </View>
          }
          onPress={this.onRowSelect.bind(this, match, groupCodes[this.props.groupCode])}
          subtitle={
            <View style={{flexDirection: 'row'}}>
              <Text> {date + '-' + time + ': ' + this.renderText(homeTeam) + ' V/S ' + this.renderText(awayTeam) }</Text>
            </View>
          } />)
      })
    )
  }
  onRowSelect (match) {
    this.props.selectGame(match)
    this.props.navigator.push({
      screen: 'SelectedGame',
      title: 'Group ' + groupCodes[this.props.groupCode] + ' - Match No' + match.matchId
    })
  }
  wrapUpProperties () {
    if (this.props.Game.matches !== undefined && this.props.Game.matches && this.props.Game.matches.length > 0) {
      const listFromProps = findByProp(this.props.matches, 'key', groupCodes[this.props.groupCode]) // very imp
      this.setState({dataSource: cloneDeep(listFromProps.matches.map((match) => {
        const { name, home_team, away_team, date } = match
        const { teams } = this.props
        return {
          matchId: name,
          homeTeam: findByProp(teams, 'id', home_team) || ' ',
          awayTeam: findByProp(teams, 'id', away_team) || ' ',
          date: convertDateTimeToDate(date, 'DD/MM/YYYY'),
          time: convertDateTimeToTime(date, 'HH:mm')
        }
      })
      )
      })
      console.log(this.state.dataSource)
    }
  }
  renderText (teamsText) {
    if (teamsText !== undefined && teamsText !== null && teamsText !== ' ') {
      return teamsText.name
    } else {
      return ''
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
const mapStateToProps = (state) => {
  const { matches, teams, groupCode } = state.Game
  return { ...state, matches: matches, groupCode:groupCode, liveFeed:state.liveFeed, teams: teams }
}

export default connect(mapStateToProps, {selectGroupCode,loadTeams,loadPredictions,loadGames, selectGame,loadUsers,calculatePoints })(GroupList)


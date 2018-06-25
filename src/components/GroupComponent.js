import React, { Component } from 'react'
import { View,Text ,StyleSheet , TouchableOpacity, Image, ListView,ScrollView } from 'react-native'
import {  getImage,ObjectsToArray, findByProp, cloneDeep, convertDateTimeToDate, convertDateTimeToTime } from '../Utility'
import { List, ListItem, Card } from 'react-native-elements'
import MaterialTabs from 'react-native-material-tabs'
import { connect } from 'react-redux'
import { selectGroupCode, loadTeams,loadPredictions,loadUsers,calculatePoints, loadGames, selectGame } from '../actions/GameAction'
import { groupCodes } from '../actions/types'
import { CardSection } from './common'
import { ListStyles } from '../styles/ListStyle'
import GameComponent from './GameComponent'
import { Spinner } from './common'

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
        <View  style={{flex:1,alignItems: "stretch"}}>
        <ScrollView style={{backgroundColor:'#fff'}}> 
            {this.renderTabs()}
            {this.renderMatchList()}
        </ScrollView>
        <Image source={getImage('bannerSrc')} resizeMode="contain"
        style={{width: null, height: '20%',flexDirection:'row-reverse'}}/>
        </View>
      )
  }
  
  renderMatchList(){
    const { listStyle } = ListStyles
    if (this.state.dataSource !== undefined && this.state.dataSource.length > 0) {
      return (
        <View style = {{flex: 1}}>
          <List style={ listStyle }>
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
    this.props.navigation.navigate(
       'SelectedGame',
      { title: 'Group ' + groupCodes[this.props.groupCode].toUpperCase() + ' - Match No ' + match.matchId }
    )
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
  return { ...state, matches: matches, groupCode:groupCode, teams: teams }
}

export default connect(mapStateToProps, {selectGroupCode,loadTeams,loadPredictions,loadGames, selectGame,loadUsers,calculatePoints })(GroupList)


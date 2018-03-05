import React, { Component } from 'react'
import { ScrollView, ListView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { List,ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { Actions } from 'react-native-router-flux'
import { loadGames, selectGame, loadTeams } from '../actions/GameAction'
import GameComponent from './GameComponent'
import { Spinner } from './common'
import { ObjectsToArray, findByProp, convertDateTimeToDate, convertDateTimeToTime } from '../Utility';

class MatchesList extends Component {
  
  componentWillMount () {
    if (this.dataSource !== undefined && this.dataSource &&  this.dataSource.length > 0) {
      this.wrapUpProperties()
    } else {
      this.props.loadGames({groupCode: '', matchId: ''})
      this.props.loadTeams()
    }
  }

  componentWillReceiveProps(){
    this.wrapUpProperties();
  }
  wrapUpProperties = () => {
    if(this.props.matches !== undefined && this.props.matches  &&  this.props.matches.length > 0){
      this.dataSource = this.props.matches[0].matches.map((match) => {
        const { name, home_team, away_team,date } = match;
        const { teams } = this.props; 
        return {
            matchId:name,
            homeTeam: findByProp(teams,'id',home_team) || " ",
            awayTeam: findByProp(teams,'id',away_team) || " ",
            date: convertDateTimeToDate(date,'DD/MM/YYYY'),
            time: convertDateTimeToTime(date,'HH:mm')
        }
      })

        console.log('ih',this.dataSource);
    }
}

renderText(teamsText){
  if(teamsText !== undefined && teamsText !== null && teamsText !== " "){
      return teamsText.name
  }else{
      return "" 
  }
}
onRowSelect(match){
    this.props.selectGame(match);
    Actions.selectedGame();
}
 
  renderList () {
    const { ListViewStyle } = styles
       return ( 
          this.dataSource.map((match, id) => {
            const { matchId, date, time, homeTeam, awayTeam } = match;
            return <ListItem key={matchId} title={"Game : "+matchId} onPress={this.onRowSelect.bind(this,match)}
                  subtitle={ date + "-" + time + ": " + this.renderText(homeTeam) + " V/S " + this.renderText(awayTeam) }  />
            })
      )
  }

    render () {
      const { ListViewStyle } = styles
     
      if (this.dataSource !== undefined && this.dataSource.length > 0) {
        console.log(this.dataSource)
        return ( 
          <List>
            {this.renderList()} 
          </List>
        )
      }else{
        return (<Spinner size="large"/>)
      }
    }
}

const mapStateToProps = (state) => {
console.log(state.Game)
  return {...state, matches: ObjectsToArray(state.Game.matches),teams:state.Game.teams}
}

export default connect(mapStateToProps, {loadGames, selectGame, loadTeams})(MatchesList)

const styles = StyleSheet.create({
  ListViewStyle: {
    alignContent: 'center'
  }
});

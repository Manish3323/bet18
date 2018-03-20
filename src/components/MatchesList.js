import React, { Component } from 'react'
import { ScrollView, ListView, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { List, ListItem } from 'react-native-elements'
import { connect } from 'react-redux'
import { loadGames, selectGame } from '../actions/GameAction'
import GameComponent from './GameComponent'
import { Spinner } from './common'
import { ObjectsToArray, findByProp, convertDateTimeToDate, convertDateTimeToTime } from '../Utility'
import { ListStyles } from '../styles/ListStyle'
class MatchesList extends Component {
  componentWillMount () {
    if (this.dataSource !== undefined && this.dataSource && this.dataSource.length > 0) {
      this.wrapUpProperties()
    } else {
      this.props.loadGames({groupCode: '', matchId: ''})
      // if(this.props.teams.length === 0){
      //   this.props.loadTeams()
      // }
    }
  }

  componentWillReceiveProps () {
    this.wrapUpProperties()
  }
  wrapUpProperties () {
    if (this.props.matches !== undefined && this.props.matches && this.props.matches.length > 0) {
      const listFromProps = findByProp(this.props.matches, 'key', this.props.groupCode) // very imp
      this.dataSource = listFromProps.matches.map((match) => {
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
    }
  }

  renderText (teamsText) {
    if (teamsText !== undefined && teamsText !== null && teamsText !== ' ') {
      return teamsText.name
    } else {
      return ''
    }
  }
  onRowSelect (match) {
    this.props.selectGame(match)
    this.props.navigator.push({
      screen: 'SelectedGame',
      title: 'Group ' + this.props.groupCode + ' - Match No' + match.matchId
    })
  }

  renderList () {
    const { listItemStyle } = ListStyles
    return (
      this.dataSource.map((match, id) => {
        const { matchId, date, time, homeTeam, awayTeam } = match
        return <ListItem style={ listItemStyle } key={matchId} title={'Game : ' + matchId} onPress={this.onRowSelect.bind(this, match, this.props.groupCode)}
          subtitle={ date + '-' + time + ': ' + this.renderText(homeTeam) + ' V/S ' + this.renderText(awayTeam) } />
      })
    )
  }

  render () {
    const { listStyle } = ListStyles
    if (this.dataSource !== undefined && this.dataSource.length > 0) {
      return (
        <List style={ listStyle }>
          {this.renderList()}
        </List>
      )
    } else {
      return (<Spinner size="large"/>)
    }
  }
}

const mapStateToProps = (state) => {
  const { matches, groupCode, teams } = state.Game
  return { ...state, matches: matches, groupCode: groupCode, teams: teams }
}

export default connect(mapStateToProps, {loadGames, selectGame})(MatchesList)

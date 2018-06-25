import React, { Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Card, CardSection, NumberInput, Spinner, Button } from './common'
import { ListStyles } from '../styles/ListStyle'
import { homeScoreChange, awayScoreChange, savePrediction, selectGame, updatePrediction } from '../actions/GameAction'
import { List, ListItem } from 'react-native-elements'
import { orderBykey, getImage } from '../Utility'
import { groupCodes } from '../actions/types'

class PredictionsComponent extends Component {

  onRowSelect (match) {
    this.props.selectGame(match, match.groupCode)
    this.props.navigation.navigate(
      'SelectedGame',
      ' Group ' + groupCodes[match.groupCode].toUpperCase() + ' - Match' + match.matchId
    )
  }
  getBackground (index) {
    return index % 2 === 0 ? '#b3d9ff' : '#4da6ff'
  }
  renderSingleComponent (match) {
    const { matchId, homeScore, awayScore, homeTeam, awayTeam, points = 0, finalHomeScore = 0, finalAwayScore = 0 } = match
    const homeIcon = getImage(homeTeam.iso2)
    const awayIcon = getImage(awayTeam.iso2)
    return <ListItem containerStyle={{backgroundColor: this.getBackground(this.props.predictions.indexOf(match))}}
      key={matchId} onPress={this.onRowSelect.bind(this, match)}
      badge={{value: points}}
      title={
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', flexDirection: 'row', marginRight: 50}}>
            <Text>{homeTeam.name}</Text>
            <Image source={ homeIcon } style={{height: 20, width: 20}}/>
            <Text> {' : '}</Text>
            <Image source={ awayIcon } style={{height: 20, width: 20}}/>
            <Text>{awayTeam.name}</Text>
          </View>
        </View>
      }
      subtitle={
        <View>
          <Text>{' Predicted  => ' + homeScore + ' : ' + awayScore}</Text>
          <Text>{' Final => ' + finalHomeScore + ' : ' + finalAwayScore}</Text>
        </View>
      } />
  }
  renderList () {
    const { listStyle } = ListStyles
    return (
      <List style={ listStyle }>
        {
          this.props.predictions.map((match) => {
            return this.renderSingleComponent(match)
          })
        }
      </List>
    )
  }
  goToUpcomingMatches () {
    this.props.navigation.navigate(
      'Recent',
      { title: 'Updates' }
    )
  }
  render () {
    const { redirectTextStyle } = ListStyles
    if (this.props.predictions !== undefined && this.props.predictions.length > 0) {
      return (
        <View style={{flex: 1}}>
          { this.renderList() }
        </View>
      )
    } if (this.props.predictions.length === 0) {
      return (
        <Button buttontext="Go To Upcoming Matches" bStyle={redirectTextStyle} onPress={() => this.goToUpcomingMatches.bind(this)}/>
      )
    } else {
      return (<Spinner size="large"/>)
    }
  }
}

const mapStateToProps = (state) => {
  const { predictions } = state.Game
  return { predictions: orderBykey(predictions, 'matchId', 'asc') }
}

export default connect(mapStateToProps, {homeScoreChange, selectGame, awayScoreChange, savePrediction, updatePrediction})(PredictionsComponent)

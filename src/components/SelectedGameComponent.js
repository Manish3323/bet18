import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text } from 'react-native'
import { Card, CardSection, NumberInput, Spinner } from './common'
import { findByProp } from '../Utility'
import { homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions } from '../actions/GameAction'
import { Button, List, ListItem } from 'react-native-elements'

class SelectedGameComponent extends Component {
  constructor (props) {
    super(props)
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this))
  }
  onNavigatorEvent (event) {
    if (event.id === 'bottomTabSelected') {
      this.props.navigator.resetTo({
        animated: true,
        animationType: 'fade',
        screen: 'drawerScreen'
      })
    }
  }
  /**
   * detects home team score changes and updates store property:  state.Game.selectedGame.homeScore
   */
  homeScoreChange  (text)  {
    this.props.homeScoreChange(text)
  }
  /**
   * detects away team score changes and updates store property:  state.Game.selectedGame.awayScore
   */
  awayScoreChange  (text)  {
    this.props.awayScoreChange(text)
  }
  /**
   * @desc updates or save prediction if  prediction is already present for a particular match
   * @desc saves prediction if predictionKey is not found i.e. there is no prediction entry for this selectedGame by current user
   * @desc updates prediction if predictionKey is found
   */
  updatePrediction () {
    const { homeScore, awayScore, predictionKey, defaultAwayScore, defaultHomeScore, groupCode, match } = this.props
    let score1 = homeScore || defaultHomeScore
    let score2 = awayScore || defaultAwayScore
    if (predictionKey === '') {
      this.props.savePrediction(match.matchId, score1, score2, groupCode, match.homeTeam, match.awayTeam)
    } else {
      this.props.updatePrediction(match.matchId, score1, score2, predictionKey, groupCode, match.homeTeam, match.awayTeam)
    }
  }

  render () {
    return (
      this.singleComponent(this.props)
    )
  }

  singleComponent (currentGame) {
    const { homeScore, awayScore, defaultHomeScore, defaultAwayScore } = currentGame
    const { homeTeam, awayTeam } = currentGame.match
    return (
      <View style={{flex: 1}}>
        <Card cardStyle={{flexDirection: 'row', height: 120}} >
          <CardSection cardSectionStyle={{flex: 2, height: 100, width: 80, marginLeft: 20}}>
            <Text>{homeTeam.name}</Text>
          </CardSection>
          <NumberInput style={{flex: 1, height: 100}} defaultValue={defaultHomeScore} value={homeScore} onChangeText={this.homeScoreChange.bind(this)}/>
          <Text> : </Text>
          <NumberInput style={{flex: 1, height: 100}} defaultValue={defaultAwayScore} value={awayScore} onChangeText={this.awayScoreChange.bind(this)}/>
          <CardSection cardSectionStyle={{flex: 2, width: 80, height: 100}}>
            <Text>{awayTeam.name}</Text>
          </CardSection>
          <Button style={{ height: 100, width: 80, flex: 1, marginRight: 20 }}title="Save Prediction" onPress={this.updatePrediction.bind(this)}></Button>
        </Card>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { selectedGame, predictions, groupCode } = state.Game
  const { match } = selectedGame
  if (match !== undefined) {
    const currentGame = findByProp(predictions, 'matchId', match.matchId)
    if (currentGame !== undefined) {
      return {...selectedGame, match: match, groupCode: groupCode, predictionKey: currentGame.key, defaultHomeScore: currentGame.homeScore, defaultAwayScore: currentGame.awayScore}
    } else {
      return { ...selectedGame, match: match, matches: predictions, groupCode: groupCode, predictionKey: '', defaultHomeScore: '', defaultAwayScore: '' }
    } 
  }
}

export default connect(mapStateToProps, {homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions})(SelectedGameComponent)

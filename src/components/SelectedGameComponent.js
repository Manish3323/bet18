import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text } from 'react-native'
import { Card, CardSection, NumberInput } from './common'
import { searchArrayByObjectKey, findByProp } from '../Utility'
import { homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions } from '../actions/GameAction'
import { Button } from 'react-native-elements'

class SelectedGameComponent extends Component {
  /**
   * user predictions each time this component is mounted
   */
  componentWillMount () {
    this.props.loadPredictions()
  }
  /**
   * detects home team score changes and updates store property:  state.Game.selectedGame.homeScore
   */
  homeScoreChange (text) {
    this.props.homeScoreChange(text)
  }
  /**
   * detects away team score changes and updates store property:  state.Game.selectedGame.awayScore
   */
  awayScoreChange (text) {
    this.props.awayScoreChange(text)
  }
  /**
   * @desc updates or save prediction if  prediction is already present for a particular match
   * @desc saves prediction if predictionKey is not found i.e. there is no prediction entry for this selectedGame by current user
   * @desc updates prediction if predictionKey is found
   */
  updatePrediction () {
    const { matchId, homeScore, awayScore, predictionKey, defaultAwayScore, defaultHomeScore } = this.props
    let score1 = homeScore || defaultHomeScore
    let score2 = awayScore || defaultAwayScore
    if (predictionKey === '') {
      this.props.savePrediction(matchId, score1, score2)
    } else {
      this.props.updatePrediction(matchId, score1, score2, predictionKey)
    }
  }

  render () {
    const { homeScore, awayScore, homeTeam, awayTeam, defaultHomeScore, defaultAwayScore } = this.props

    return (
      <View>
        <View style={{flexDirection: 'row'}}>
          <CardSection>
            <Text>{homeTeam.name}</Text>
          </CardSection>
          <NumberInput defaultValue={defaultHomeScore} value={homeScore} onChangeText={this.homeScoreChange.bind(this)}/>
          <Text> : </Text>
          <NumberInput defaultValue={defaultAwayScore} value={awayScore} onChangeText={this.awayScoreChange.bind(this)}/>
          <CardSection>
            <Text>{awayTeam.name}</Text>
          </CardSection>
        </View>
        <View>
          <Button title="Save Prediction" onPress={this.updatePrediction.bind(this)}></Button>
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state) => {
  const { selectedGame, predictions } = state.Game
  const currentGame = findByProp(predictions, 'matchId', selectedGame.matchId)
  if (currentGame) {
    return { ...selectedGame, predictionKey: currentGame.key, defaultHomeScore: currentGame.homeScore, defaultAwayScore: currentGame.awayScore } // currentGame
  } else {
    return { ...selectedGame, predictionKey: '', defaultHomeScore: '', defaultAwayScore: '' }
  }
}

export default connect(mapStateToProps, {homeScoreChange, awayScoreChange, loadPredictions, savePrediction, updatePrediction})(SelectedGameComponent)

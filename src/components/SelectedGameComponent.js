import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text, Image } from 'react-native'
import { Card, CardSection, NumberInput, Spinner } from './common'
import { findByProp, getImage } from '../Utility'
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
    const homeIcon = getImage(homeTeam.iso2)
    const awayIcon = getImage(awayTeam.iso2)
    return (
      <View style={{flex: 1,backgroundColor: 'white'}}>
        <Card cardStyle={{flexDirection: 'row', backgroundColor: '#b3d9ff', alignItems: 'center', justifyContent: 'center'}}>
          <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
            <Image source={ homeIcon } style={{height: 20, width: 20}}/>
            <Text>{homeTeam.name}</Text>
          </CardSection>
          <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
            <NumberInput defaultValue={defaultHomeScore} value={homeScore} onChangeText={this.homeScoreChange.bind(this)}/>
            <Text> : </Text>
            <NumberInput defaultValue={defaultAwayScore} value={awayScore} onChangeText={this.awayScoreChange.bind(this)}/>
          </CardSection>
          <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
            <Text>{awayTeam.name}</Text>
            <Image source={ awayIcon } style={{height: 20, width: 20}}/>
          </CardSection>
        </Card>
        <Card cardStyle={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
          <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
            <Button backgroundColor='#4da6ff' color='white' title="Save Prediction" onPress={this.updatePrediction.bind(this)}></Button>
          </CardSection>
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
      return {...selectedGame, match: match, groupCode: match.groupCode, predictionKey: currentGame.key, defaultHomeScore: currentGame.homeScore, defaultAwayScore: currentGame.awayScore}
    } else {
      return { ...selectedGame, match: match, matches: predictions, groupCode: groupCode, predictionKey: '', defaultHomeScore: '', defaultAwayScore: '' }
    }
  }
}

export default connect(mapStateToProps, {homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions})(SelectedGameComponent)

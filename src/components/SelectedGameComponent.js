import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text } from 'react-native'
import { Card, CardSection, NumberInput,Spinner } from './common'
import { searchArrayByObjectKey, findByProp } from '../Utility'
import { homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions } from '../actions/GameAction'
import { Button, List, ListItem } from 'react-native-elements'
import { MODE_LIST } from '../actions/types'
import { ListStyles } from '../styles/ListStyle'

class SelectedGameComponent extends Component {
  /**
   * user predictions each time this component is mounted
   */
  componentWillMount () {
    this.listView = false
    if (this.props.mode !== undefined && this.props.mode === MODE_LIST) {
      this.listView = true
      this.setupDataSource()
    }
  }
  componentWillReceiveProps () {
    this.setupDataSource();
  }
  setupDataSource (){
    // let completeArray = this.props.matches.map(match => {
    //   findByProp(teams,'id',matches)
    // })
    this.dataSource = this.props.matches
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
    const { matchId, homeScore, awayScore, predictionKey, defaultAwayScore, defaultHomeScore } = this.props
    let score1 = homeScore || defaultHomeScore
    let score2 = awayScore || defaultAwayScore
    if (predictionKey === '') {
      this.props.savePrediction(matchId, score1, score2)
    } else {
      this.props.updatePrediction(matchId, score1, score2, predictionKey)
    }
  }
  renderList () {
    if(this.dataSource){
      const { listStyle, listItemStyle } = ListStyles
      return (
        <List style={ listStyle }>
          <View style={listItemStyle}>{
            this.dataSource.map((match, id) => {
              return this.singleComponent(match)
            })
          }
          </View>
        </List>
      )
    } else {
      return <Spinner size="small" />
    }
  }
  renderListOrSingle () {
    if (!this.listView) {
      return (this.singleComponent(this.props))
    } else {
      return (
          this.renderList()
      )
    }
  }
  render () {
    return (
      this.renderListOrSingle()
    )
  }
  singleComponent = (match) => {
    const { groupCode, homeScore, awayScore, homeTeam, awayTeam, defaultHomeScore, defaultAwayScore } = match
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
mapStateToProps = (state) => {
  const { selectedGame, predictions,matches } = state.Game
  if( selectedGame.matchId !== undefined){
    const currentGame = findByProp(predictions, 'matchId', selectedGame.matchId)
    const uniqueMatchesDetail = findByProp(matches,'key',selectedGame.groupCode) 
    const {home_team,away_team} = findByProp(uniqueMatchesDetail,'matchId',selectedGame.matchId)
    const { homeTeam } = findByProp(teams,'id',home_team)
    const { awayTeam } = findByProp(teams,'id',away_team)
    return { ...selectedGame, matches: predictions, predictionKey: currentGame.key, defaultHomeScore: currentGame.homeScore, defaultAwayScore: currentGame.awayScore}
  } else {
    return { ...selectedGame, matches: predictions, predictionKey: '', defaultHomeScore: '', defaultAwayScore: '' }
  } 
}
export default connect(mapStateToProps, {homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions})(SelectedGameComponent)

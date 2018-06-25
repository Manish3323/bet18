import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, View, Text, Image, Alert } from 'react-native'
import { Card, CardSection, NumberInput, Spinner } from './common'
import { findByProp, getImage } from '../Utility'
import { homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions } from '../actions/GameAction'
import { Button, List, ListItem } from 'react-native-elements'
import { FUTURE_DATA, PAST_DATA } from '../actions/types';

class EventSelectedComponent extends Component {
  constructor (props) {
    super(props)
  }
  state={
    changeDetect:false,
    tense:null
  }
  static navigationOptions =({navigation})=>{
    return {
      title: navigation.state.params.title,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    }
  }
  componentWillMount(){
      this.setState({tense: this.props.navigation.state.params.tense})
  }
  onNavigatorEvent (event) {
    if (event.id === 'bottomTabSelected') {
      this.props.navigation.resetTo({
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
    if (this.props.defaultHomeScore !== text) {
      this.props.homeScoreChange(text)
      this.setState({changeDetect: true})
    }
  }
  /**
   * detects away team score changes and updates store property:  state.Game.selectedGame.awayScore
   */
  awayScoreChange (text) {
    if (this.props.defaultHomeScore !== text) {
      this.props.awayScoreChange(text)
      this.setState({changeDetect: true})
    }
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
    if (this.state.changeDetect && this.state.tense === FUTURE_DATA) {
      if (predictionKey === '') {
        this.props.savePrediction(match.matchId, score1, score2, groupCode, match.homeTeam, match.awayTeam)
      } else {
        this.props.updatePrediction(match.matchId, score1, score2, predictionKey, groupCode, match.homeTeam, match.awayTeam)
      }
    } else {
      Alert.alert('Failed whie Saving!')
    }
  }

  render () {
    return (
      this.singleComponent(this.props.match)
    )
  }     

  singleComponent (event) {
    const { idEvent,strEventName,homeTeam, awayTeam, date,time,intRound, defaultHomeScore='0' , defaultAwayScore='0',homeScore,awayScore } =  event
    const homeIcon = getImage(this.getIsoByName(homeTeam))
    const awayIcon = getImage(this.getIsoByName(awayTeam))
    return (
      <View style={{flex: 1, backgroundColor: 'white',alignItems: "stretch"}}>
        <View  style={{flex: 1}} >
        <Card cardStyle={{flexDirection: 'row', backgroundColor: '#b3d9ff', alignItems: 'center', justifyContent: 'center'}}>
            <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
                <Text> Round {intRound} : {strEventName} </Text>
            </CardSection>
        </Card>
          <Card cardStyle={{flexDirection: 'row', backgroundColor: '#b3d9ff', alignItems: 'center', justifyContent: 'center'}}>
            <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
              <Image source={ homeIcon } style={{height: 20, width: 20}}/>
              <Text>{homeTeam}</Text>
            </CardSection>
            <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
              <NumberInput defaultValue={defaultHomeScore} value={homeScore} onChangeText={this.homeScoreChange.bind(this)}/>
              <Text> : </Text>
              <NumberInput defaultValue={defaultAwayScore} value={awayScore} onChangeText={this.awayScoreChange.bind(this)}/>
            </CardSection>
            <CardSection cardSectionStyle={{backgroundColor: 'transparent'}}>
              <Text>{awayTeam}</Text>
              <Image source={ awayIcon } style={{height: 20, width: 20}}/>
            </CardSection>
          </Card>
        </View>
        <Image source={getImage('bannerSrc')} resizeMode="contain"
        style={{width: null, height: '20%',flexDirection:'row-reverse'}}/>
        </View>
    )
  }
  getIsoByName=(name)=>{
    if(this.props.teams!=undefined && this.props.teams && this.props.teams.length > 0){
        const obj = findByProp(this.props.teams,'name',name)
        return obj ? obj.iso2 : name.substring(0,2).toLowerCase()
    }else{
        return name.substring(0,2).toLowerCase()
    }
}
}

const mapStateToProps = (state) => {
  const { selectedGame, predictions, groupCode,teams } = state.Game
  const { match } = selectedGame
  if (match !== undefined) {
      return {...selectedGame, match: match,teams: teams ,  groupCode: groupCode, defaultHomeScore: match.homeScore, defaultAwayScore: match.awayScore}
      }
}

export default connect(mapStateToProps, {homeScoreChange, awayScoreChange, savePrediction, updatePrediction, loadPredictions})(EventSelectedComponent)

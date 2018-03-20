import React, { Component} from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'
import { Card, CardSection, NumberInput, Spinner } from './common'
import { ListStyles } from '../styles/ListStyle'
import { homeScoreChange, awayScoreChange, savePrediction, selectGame, updatePrediction } from '../actions/GameAction'
import { Button, List, ListItem } from 'react-native-elements'
import { orderBykey } from '../Utility'

class PredictionsComponent extends Component {
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

  onRowSelect (match) {
    this.props.selectGame(match)
    this.props.navigator.push({
      screen: 'SelectedGame',
      passProps: match,
      title: ' Group ' + match.groupCode + ' - Match No' + match.matchId
    }).catch((err) => {
      console.log(err)
    })
  }
  renderSingleComponent (match) {
    const { listItemStyle } = ListStyles
    const { matchId, homeScore, awayScore, key, groupCode, homeTeam, awayTeam } = match
    return <ListItem style={ listItemStyle }
      key={matchId} title={'Match : ' + matchId} onPress={this.onRowSelect.bind(this, match)}
      subtitle={homeTeam.name + ' ' + homeScore + ' : ' + awayScore + ' ' + awayTeam.name} />
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
    this.props.navigator.resetTo({
      screen: 'dashboard',
      title: 'DashBoard'
    })
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
        <TouchableOpacity style={redirectTextStyle} onPress={() => this.goToUpcomingMatches()}>
          <Text> Go To Upcoming Matches </Text>
        </TouchableOpacity>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import { Card, CardSection } from '../components/common'
class CurrenMatchComponent extends Component {
  static navigationOptions = ({navigation})=>{
    console.log(navigation)
    return {
      title: navigation.state.params.title,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    }
  }
  render () {
    const { MatchStr, Round, AwayGoals, AwayTeamRedCardDetails, AwayTeamYellowCardDetails, Date, HomeGoals, HomeTeamRedCardDetails, HomeTeamYellowCardDetails, League, Time, awayTeam, homeTeam, Location } = this.props.currentMatch
    return (
      <View style={{flex: 1}}>
        <View>
          <Card>
            <CardSection cardSectionStyle={{justifyContent: 'center'}}>
              <Text>{MatchStr}</Text>
            </CardSection>
          </Card>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Card cardStyle={{flexDirection: 'row', width: Dimensions.get('window').width / 3}} >
            <CardSection>
              <Text>{homeTeam}</Text>
            </CardSection>
          </Card>
          <Card cardStyle={{flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width / 4}}>
            <CardSection>
              <Text>{HomeGoals}</Text>
            </CardSection>
            <Text> : </Text>
            <CardSection>
              <Text>{AwayGoals}</Text>
            </CardSection>
          </Card>
          <Card cardStyle={{flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width / 3}}>
            <CardSection>
              <Text>{awayTeam}</Text>
            </CardSection>
          </Card>
        </View>
        <View>
        <Card>
          <CardSection cardSectionStyle={{justifyContent: 'center'}}>
            <Text> Stats </Text>
          </CardSection>
        </Card>
      </View>
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Card cardStyle={{flexDirection: 'row', width: Dimensions.get('window').width / 4}}>
            <CardSection cardContainerStyle={{justifyContent: 'center'}} >
              <Text>Red Cards  : {homeTeam}</Text>
            </CardSection>
          </Card>
        </View>
      </View>
    )
  }
}
const styleBox = StyleSheet.create({
  box: {
    width: 1,
    backgroundColor: '#333',
    marginBottom: 10
  }
})
const mapStateToProps = (state) => {
  return { currentMatch: state.Game.selectedCurrentMatch,

  }
}
export default connect(mapStateToProps, {})(CurrenMatchComponent)

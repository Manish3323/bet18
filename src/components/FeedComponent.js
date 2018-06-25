import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, Image, Button, ScrollView,RefreshControl, TouchableOpacity } from 'react-native'
import { List, ListItem  } from 'react-native-elements'
import MaterialTabs from 'react-native-material-tabs'
import { Spinner } from './common/Spinner';
import { fetchLiveData,fetchFutureData,fetchPastData, apiList } from '../helpers/fetchRealTime'
import { setLiveData,setFutureData,setPastData,loadTeams,selectCurrentMatch,selectGame } from '../actions/GameAction'
import { findByProp, cloneDeep, convertDateTimeToDate, getImage,arrayContainsItem } from '../Utility';
import { groupCodes, NO_CURRENT_MATCHES, FUTURE_DATA, PAST_DATA } from '../actions/types';
import { ListStyles } from '../styles/ListStyle';
class FeedComponent extends Component {
    componentWillMount(){
        if(this.state.liveDataSource!==undefined && this.state.liveDataSource && this.state.liveDataSource.length >0 ){
            this.wrapProperties()
        }else if(this.state.pastDataSource!==undefined && this.state.pastDataSource && this.state.pastDataSource.length >0 ){
            this.wrapProperties()
        }
        else if(this.state.futureDataSource!==undefined && this.state.futureDataSource && this.state.futureDataSource.length >0 ){
            this.wrapProperties()
        }
        else{
            this.loadAllData()
        }
    }
    async loadAllData () {
        await this.props.loadTeams()
        await this.props.setLiveData(fetchLiveData(apiList['liveScoreByLeague']))
        await this.props.setFutureData(fetchFutureData(apiList['futureMatches']))
        await this.props.setPastData(fetchPastData(apiList['pastMatches']))
        this.setState({refreshing: false});
    }
   
    _onRefresh() {
        this.setState({refreshing: true})
        this.loadAllData()
      }
    
    componentWillReceiveProps(){
        this.wrapProperties()
    }
    state={
        selectedTab:1,
        refreshing: false,
    }
    tabArray=['Finished','Current','Upcoming']
    renderFeed = () =>{
        return(
            <ScrollView  refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }>
                {this.loadFeedContent()}
            </ScrollView>)

    }
    render () {
        return ( 
            <View style={{flex:1 }}>  
                <MaterialTabs  items={this.tabArray}
                selectedIndex={this.state.selectedTab}
                onChange={(index) => { 
                            this.setState({selectedTab:index});
                        }}
                barColor="#1fbcd2"
                indicatorColor="#fffe94"
                activeTextColor="white"
                textStyle={{ fontFamily: 'Papyrus' }}/>
                {this.renderFeed()}
            </View>
            )
    }
    wrapProperties=()=>{
          if(this.props.Game.liveFeed !== undefined && this.props.Game.liveFeed === NO_CURRENT_MATCHES ){
            this.setState({liveDataSource: [NO_CURRENT_MATCHES] })
          }
          else if (this.props.Game.liveFeed !== undefined && this.props.Game.liveFeed && this.props.Game.liveFeed.length > 0) {
            const listFromProps = findByProp(this.props.Game.liveFeed, 'League','Superettan' ) // very imp
            this.setState({liveDataSource: cloneDeep(this.props.Game.liveFeed.map((match) => {
              const { AwayTeam,Time, HomeTeam, AwayGoals, HomeGoals,Location, Round,HomeTeamYellowCardDetails={}, Date, League,Stadium,AwayTeamRedCardDetails={},HomeTeamRedCardDetails={},AwayTeamYellowCardDetails={} } = match
              const { teams } = this.props
              return {
                League: League,
                MatchStr: HomeTeam+' V/S '+ AwayTeam,
                homeTeam: findByProp(teams, 'id', HomeTeam) || HomeTeam,
                awayTeam: findByProp(teams, 'id', AwayTeam) || AwayTeam,
                HomeGoals: HomeGoals,
                AwayGoals: AwayGoals,
                Date:Date,
                Round:Round,
                Time:Time,
                Location:Location,
                AwayTeamYellowCardDetails:AwayTeamYellowCardDetails,
                HomeTeamYellowCardDetails:HomeTeamYellowCardDetails,
                HomeTeamRedCardDetails:HomeTeamRedCardDetails,
                AwayTeamRedCardDetails:AwayTeamRedCardDetails
              }
            })
            )
            })
          }
           
        if (this.props.futureFeed !== undefined && this.props.futureFeed && this.props.futureFeed.length > 0) {
            const listFromProps = findByProp(this.props.futureFeed, 'idLeague','4429' ) // very imp
            this.setState({futureDataSource: cloneDeep(this.props.futureFeed.map((event) => {
              const { idEvent,strEvent,strHomeTeam, strAwayTeam, dateEvent,strTime,intRound } = event
              const { teams } = this.props
              return {
                idEvent: idEvent,
                strEventName: strEvent,
                intRound: intRound,
                homeTeam: findByProp(teams, 'id', strHomeTeam) || strHomeTeam,
                awayTeam: findByProp(teams, 'id', strAwayTeam) || strAwayTeam,
                date: dateEvent,
                time: strTime
              }
            })
            )
            })
          }
          if (this.props.pastFeed !== undefined && this.props.pastFeed && this.props.pastFeed.length > 0) {
            const listFromProps = findByProp(this.props.pastFeed, 'idLeague','4429' ) // very imp
            this.setState({pastDataSource: cloneDeep(this.props.pastFeed.map((event) => {
              const { idEvent,strEvent,strHomeTeam, strAwayTeam, dateEvent,strTime,intRound } = event
              const { teams } = this.props
              return {
                idEvent: idEvent,
                strEventName: strEvent,
                intRound: intRound,
                homeTeam: arrayContainsItem(teams,strHomeTeam) ? findByProp(teams, 'id', strHomeTeam) || strHomeTeam : strHomeTeam,
                awayTeam: arrayContainsItem(teams,strHomeTeam) ? findByProp(teams, 'id', strAwayTeam) || strAwayTeam : strAwayTeam,
                date: dateEvent,
                time: strTime
              }
            })
            )
            })
          }
    }
    getBackground(index) {
        return index % 2 === 0 ? '#b3d9ff' : '#4da6ff' // this.getBackground(this.dataSource.indexOf(groupCode))
    }
    onMatchSelect (match) {
        console.log(match)
        this.props.selectCurrentMatch(match)
        this.props.navigation.navigate(
          'CurrentMatch',
          { title :'Status : '+ match['Time'] }
        )
    }
    onEventSelect  (event,sourceType) {
        this.props.selectGame(event)
        this.props.navigation.navigate(
            'SelectedEvent',
            { title : event['date'] +"   "+ event['time'], tense: sourceType }
          )
    }
    renderList=()=>{
       switch (this.state.selectedTab){
           case 0: return this.renderListEvents(); break;
           case 1: return this.renderListCurrent(); break;
           case 2:  
           default: return this.renderListEvents(); break;
       }
    }
    renderListEvents = ()=>{
            let  source = null;
            let sourceType = null;
            if(this.state.pastDataSource!==undefined && this.state.pastDataSource && this.state.pastDataSource.length >0 && this.state.selectedTab == 0){
                source = this.state.pastDataSource
                sourceType = PAST_DATA
            }else if ( this.state.futureDataSource!==undefined && this.state.futureDataSource && this.state.futureDataSource.length >0 &&  this.state.selectedTab == 2){
                source = this.state.futureDataSource
                sourceType = FUTURE_DATA
            }
            if(source !== null){
                return (source.map((event,id)=>{
                    const { idEvent,strEventName,homeTeam, awayTeam, date,time,intRound } = event
                    const homeIcon = getImage(this.getIsoByName(homeTeam))
                    const awayIcon = getImage(this.getIsoByName(awayTeam))
                    return (<ListItem  onPress={this.onEventSelect.bind(this,event,sourceType)} containerStyle={ {backgroundColor: this.getBackground(source.indexOf(event))}} key={idEvent}
                    title={
                        <View style={{flexDirection: 'row'}}>
                        <Text> {'Round'+ intRound }</Text>
                        <View style={{justifyContent:'center',alignItems: 'center', flexDirection: 'row', marginRight: 50}}>
                            <Image source={ homeIcon } style={{height: 20, width: 20}}/>
                            <Text> {' : '}</Text>
                            <Image source={ awayIcon } style={{height: 20, width: 20}}/>
                        </View>
                        </View>
                    }
                    subtitle={
                        <View style={{flexDirection: 'row'}}>
                        <Text> {date + ' ' + time + ': ' + strEventName }</Text>
                        </View>
                    } />)
                }))
        }else{
            return (<Spinner size="large"/>)
        }
    }

    renderListCurrent = ()=>{
        if (this.state.liveDataSource!==undefined  && this.state.liveDataSource[0] === NO_CURRENT_MATCHES) 
        {
            const { redirectTextStyle } = ListStyles 
          return (  
              <View style={{flex:1}}><TouchableOpacity>
                <Button raised={true} underlayColor='green' onPress={this.goToUpcomingMatches.bind(this)}color='silver' title="Go To Upcoming Matches"/>
            </TouchableOpacity></View> )
        }
        else  if(this.state.liveDataSource!==undefined && this.state.liveDataSource && this.state.liveDataSource.length !== undefined && this.state.liveDataSource.length >0 ){
            return (this.state.liveDataSource.map((match,id)=>{
                const { League,MatchStr,homeTeam, awayTeam,HomeGoals,AwayGoals, Date, Round } = match
                const homeIcon = getImage(this.getIsoByName(homeTeam))
                const awayIcon = getImage(this.getIsoByName(awayTeam))
                return (<ListItem onPress={this.onMatchSelect.bind(this,match)} containerStyle={ {backgroundColor: this.getBackground(this.state.liveDataSource.indexOf(match))}} key={id}
                  title={
                    <View style={{flexDirection: 'row'}}>
                        <Text> { League+ ' :: Round : ' + Round }</Text>
                        <View style={{justifyContent:'center',alignItems: 'center', flexDirection: 'row', marginRight: 50}}>
                            <Image source={ homeIcon } style={{height: 20, width: 20}}/>
                            <Text> { HomeGoals + ' : ' + AwayGoals}</Text>
                            <Image source={ awayIcon } style={{height: 20, width: 20}}/>
                        </View>
                    </View>
                  }
                 
                  />)
            }))
        }
        else {
            return (<Spinner size="large"/>)
        }
    }
    goToUpcomingMatches() {
        this.setState({selectedTab:2})
    }
    renderText (teamsText) {
        if (teamsText !== undefined && teamsText !== null && teamsText !== ' ') {
          return teamsText.name
        } else {
          return ''
        }
      }
    loadFeedContent = () =>{
        const { listStyle } = ListStyles
        return(<List style={listStyle}>
                    {this.renderList()}
                </List>)
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
  return { ...state, teams:state.Game.teams, liveFeed: state.Game.liveFeed,futureFeed : state.Game.futureFeed,pastFeed: state.Game.pastFeed}
}

export default connect(mapStateToProps, {setLiveData,setFutureData,selectCurrentMatch,setPastData,loadTeams, selectGame})(FeedComponent)

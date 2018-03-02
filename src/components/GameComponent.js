import React,{ Component } from 'react';
import { View, Text,TouchableWithoutFeedback } from 'react-native';
import { Card, CardSection } from './common';
import { connect } from 'react-redux';
import { selectGame } from '../actions/GameAction';
import { Actions } from 'react-native-router-flux';
import { findByProp,convertDateTimeToDate,convertDateTimeToTime } from '../Utility';

class GameComponent extends Component{
    componentObject = {}
    onRowSelect(){
        this.props.selectGame(this.props.match);
        Actions.selectedGame();
    }
    componentWillMount(){
       // this.wrapUpProperties();
    }
    componentWillReceiveProps(){
        this.wrapUpProperties();
    }
    wrapUpProperties =()=> {
        const { name, home_team, away_team,date} = this.props.match;
        const { teams } = this.props; 
        this.componentObject = {
            matchNumber:name,
            homeTeam: findByProp(teams,'id',home_team) || " ",
            awayTeam: findByProp(teams,'id',away_team) || " ",
            date: convertDateTimeToDate(date),
            time: convertDateTimeToTime(date)
        }
        console.log('component object',this.componentObject);
    }
    renderText(teamsText){
        console.log(teamsText)
        if(teamsText !== undefined && teamsText !== null && teamsText !== " "){
            return teamsText.name
        }else{
            return "" 
        }
    }
    render(){
        const { matchNumber, homeTeam, awayTeam,date,time} = this.componentObject;
        return(
            <TouchableWithoutFeedback onPress={this.onRowSelect.bind(this)}>
                <View>
                    <Card> 
                        <CardSection style={{alignItems:'flex-start'}}>
                            <Text> Game {matchNumber}</Text> 
                            <Text> {date} - {time} </Text> 
                            <Text> { this.renderText(homeTeam) } V/S {  this.renderText(awayTeam) } </Text>
                        </CardSection>
                    </Card>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}
mapStateToProps=(state)=>{
    const { teams } = state.Game; 
    return {teams}
}
export default connect(mapStateToProps,{selectGame})(GameComponent);


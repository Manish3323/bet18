import React,{ Component } from 'react';
import { ScrollView, ListView,Text,StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { loadGames,selectGame,loadTeams } from '../actions/GameAction';
import GameComponent from './GameComponent';
import { Spinner } from './common';
import { ObjectsToArray } from '../Utility';

class MatchesList extends Component{
    componentWillMount(){
        this.rendered = false
        if(this.props.matches.length > 0 ){
            this.createDatasource(this.props);
        }else if(this.props.matches.length === 0 ){
            this.props.loadGames({groupCode:'',matchId:''});
            this.props.loadTeams();
        }
    }

    componentWillReceiveProps(nextProps){
       this.createDatasource(nextProps);
    }

    createDatasource({matches}){
        const ds = new ListView.DataSource({
            rowHasChanged:(r1,r2)=> r1 != r2
        });
        this.dataSource = ds.cloneWithRows(matches[0].matches);
    }

    renderGame=(match)=>{
        return(
                   <GameComponent  match={match}/>
            );
    }
    renderList(){
        const { ListViewStyle } = styles;
        
        if(this.props.matches.length > 0){
                return( <ListView style={ListViewStyle}   contentContainerStyle={{flex:1}} enableEmptySections dataSource={this.dataSource}  renderRow={(rowData)=>this.renderGame(rowData)} /> );
        }else{
            return(<Spinner size="large"/>)
        }
    }

    render(){
        return(
                this.renderList()             
            );
    }
}

mapStateToProps = (state)=>{
    return {...state,matches:ObjectsToArray(state.Game.matches)};
}
export default connect(mapStateToProps,{loadGames,selectGame,loadTeams})(MatchesList);

const styles=StyleSheet.create({
    ListViewStyle:{
        alignContent:'center'
    }
});
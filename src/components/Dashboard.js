import React, { Component } from 'react';
import { View,Text } from 'react-native';
import firebase from 'firebase';
import MatchesList from './MatchesList';


export default class DashBoard extends Component{
    componentWillMount(){
        // console.log("as")
        // firebase.database().ref('/groups/a/matches')
        // .on('value',(snapshot)=>{
        //     console.log(snapshot.val());
        // });
    }
    render(){
        return(
            <View style={{flex:1}}>
                <MatchesList/>
            </View>
        );
    }
}


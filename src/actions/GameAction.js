import { LOAD_GAMES, SELECT_GAME,GROUPS_URL,TEAMS_URL,LOAD_TEAMS,AWAY_SCORE_CHANGED,PREDICTIONS_URL,HOME_SCORE_CHANGED,USERS_URL,LOAD_PREDICTIONS } from './types';
import firebase from 'firebase';
import { ObjectsToArray } from '../Utility';
import { Alert } from 'react-native';


export const loadGames = ({groupCode,matchId}) => {
    let url = GROUPS_URL;
    if(groupCode != ''){
        url = url +'/'+ groupCode;
    }
    else if(groupCode!= '' && matchId!=''){
        url = url + '/'+ groupCode +'/'+ matchId; 
    }
    return (dispatch)  => {
        firebase.database().ref(url)
        .on('value',(snapshot)=>{
            let array = ObjectsToArray(snapshot.val());
            dispatch({type:LOAD_GAMES,payload:array});
        })
    }
}
export const loadTeams = () => {
    let url = TEAMS_URL;
    return (dispatch)  => {
        firebase.database().ref(url)
        .on('value',(snapshot)=>{
            let array = ObjectsToArray(snapshot.val());
            dispatch({type:LOAD_TEAMS,payload:array});
        })
    }  
}

export const selectGame = (match) => {
    return {
        type:SELECT_GAME,
        payload:match
    }
}
export const loadPredictions = () => {
    const user  = firebase.auth().currentUser;
    let url = USERS_URL+'/'+user.uid+PREDICTIONS_URL;
    return (dispatch)  => {
        firebase.database().ref(url)
        .on('value',(snapshot)=>{
            let array = ObjectsToArray(snapshot.val());
            dispatch({type:LOAD_PREDICTIONS,payload:array});
        })
    }  
}

export const homeScoreChange = (text) => {
    return {
        type:HOME_SCORE_CHANGED,
        payload:text
    }
}

export const awayScoreChange = (text) => {
    return {
        type:AWAY_SCORE_CHANGED,
        payload:text
    }
}
export const updatePrediction = (matchId,homeScore,awayScore,predictionKey)=>{
    return (dispatch) => {
        const user  = firebase.auth().currentUser;
        let url = USERS_URL+'/'+user.uid+PREDICTIONS_URL+'/'+predictionKey;
        firebase.database().ref(url)
        .set({
            uid:user.uid,
            matchId:matchId,
            homeScore:homeScore,
            awayScore:awayScore
        },(data)=>{
            Alert.alert('Saved');
        });
    }
}

export const savePrediction = (matchId,homeScore,awayScore)=>{
    return (dispatch) => {
        const user  = firebase.auth().currentUser;
        let url = USERS_URL+'/'+user.uid+PREDICTIONS_URL;
      
        firebase.database().ref(url)
        .push({
            uid:user.uid,
            matchId:matchId,
            homeScore:homeScore,
            awayScore:awayScore
        },(data)=>{
            Alert.alert('Saved');
        });
    }
}
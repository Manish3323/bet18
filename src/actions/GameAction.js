import { LOAD_GAMES, SELECT_GAME,GROUPS_URL,TEAMS_URL,LOAD_TEAMS } from './types';
import firebase from 'firebase';
import { ObjectsToArray } from '../Utility';

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
import { LOAD_GAMES,SELECT_GAME,LOAD_TEAMS,HOME_SCORE_CHANGED,AWAY_SCORE_CHANGED,LOAD_PREDICTIONS } from '../actions/types';

const INITIAL_STATE = {
    matches:{},
    selectedGame:{},
    teams:[],
    predictions:[]
}

export default GameReducer= (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case LOAD_GAMES: 
            return { ...state,matches:action.payload}
        case SELECT_GAME:
            return { ...state,selectedGame:action.payload}
        case LOAD_TEAMS:
            return { ...state,teams:action.payload}
        case HOME_SCORE_CHANGED:{
            return { ...state,selectedGame:{
                    ...state.selectedGame,homeScore:action.payload
                    }
                }
            }
        case AWAY_SCORE_CHANGED:{
            return { ...state,selectedGame:{
                    ...state.selectedGame,awayScore:action.payload 
                }
            }
        }

        case LOAD_PREDICTIONS : {
            console.log(action.payload);
            return { ...state,predictions:action.payload }
        }
        default: return state;
        
    }
}
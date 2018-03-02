import { LOAD_GAMES,SELECT_GAME,LOAD_TEAMS } from '../actions/types';

const INITIAL_STATE = {
    matches:{},
    selectedGame:{},
    teams:[]
}

export default GameReducer= (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case LOAD_GAMES: 
            return { ...state,matches:action.payload}
        case SELECT_GAME:
            return { ...state,selectedGame:action.payload}
        case LOAD_TEAMS:
            {
                return { ...state,teams:action.payload}
            }
        default: return state;
        
    }
}
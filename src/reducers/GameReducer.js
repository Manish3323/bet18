import { LOAD_GAMES, SELECT_GAME, LOAD_TEAMS, HOME_SCORE_CHANGED, AWAY_SCORE_CHANGED, LOADING, SET_CURRENT_GROUPID, LOAD_PREDICTIONS, CLEANUP, LOAD_USERS, CALCULATE_POINTS, UPDATE_POINTS_TO_PREDICTION, LIVE_DATA, FUTURE_DATA, PAST_DATA, SELECT_CURRENT_MATCH, NO_CURRENT_MATCHES } from '../actions/types'

const INITIAL_STATE = {
  matches: {},
  selectedGame: {},
  teams: [],
  predictions: [],
  users: [],
  groupCode: 0
}

export default GameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_GAMES:
      return { ...state, matches: action.payload, loading: false }
    case SELECT_GAME:
      return { ...state, selectedGame: action.payload }
    case LOAD_TEAMS:
      return { ...state, teams: action.payload, loading: false }
    case HOME_SCORE_CHANGED: {
      return { ...state,
        selectedGame: {
          ...state.selectedGame, homeScore: action.payload
        }
      }
    }
    case AWAY_SCORE_CHANGED: {
      return { ...state,
        selectedGame: {
          ...state.selectedGame, awayScore: action.payload
        }
      }
    }
    case LOAD_PREDICTIONS : {
      return { ...state, predictions: action.payload, loading: false }
    }
    case CLEANUP : {
      return { ...state, predictions: [], loading: false }
    }
    case LOADING: {
      return { ...state, loading: true }
    }
    case SET_CURRENT_GROUPID : {
      return { ...state, groupCode: action.payload }
    }
    case LOAD_USERS : {
      return { ...state, users: action.payload }
    }
    case CALCULATE_POINTS : {
      return { ...state, users: action.payload }
    }
    case UPDATE_POINTS_TO_PREDICTION : {
      return { ...state, predictions: action.payload, loading: false }
    }
    case LIVE_DATA : {
      return { ...state, liveFeed: action.payload, loading: false }
    }
    case FUTURE_DATA : {
      return { ...state, futureFeed: action.payload, loading: false }
    }
    case PAST_DATA : {
      return { ...state, pastFeed: action.payload, loading: false }
    }
    case SELECT_CURRENT_MATCH : {
      return { ...state, selectedCurrentMatch: action.payload }
    }
    case NO_CURRENT_MATCHES : {
      return { ...state, liveFeed: action.payload, loading: false }
    }
    default: return state
  }
}

import { combineReducers } from 'redux'
import AuthReducer from './AuthReducer'
import GameReducer from './GameReducer'
import AppReducer from './AppReducer'
import IconReducer from './IconReducer'
import NetInfo from './CheckNetInfo'

export default combineReducers({
  Auth: AuthReducer,
  Game: GameReducer,
  app: AppReducer,
  icon: IconReducer,
  netInfo: NetInfo

})

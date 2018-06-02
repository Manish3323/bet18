// auth actions
export const SIGNUP = 'Sign UP'
export const LOGIN = 'LOG IN'
export const EMAIL_CHANGED = 'EMAIL_CHANGED'
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGIN_PROCESS = 'LOGIN_PROCESS'
export const LOGOUT = 'LOGOUT'
export const INCORRECT_CREDENTIALS = 'INCORRECT CsREDENTIALS'
export const REGISTER_USER_PROCESS = 'REGISTER_USER_PROCESS'
export const INVALID_PASSWORDS = 'INVALID_PASSWORDS'
export const CURRENT_PASSWORD_CHANGED = 'CURRENT_PASSWORD_CHANGED'
export const HOME_SCORE_CHANGED = 'HOME_SCORE_CHANGED'
export const AWAY_SCORE_CHANGED = 'AWAY_SCORE_CHANGED'
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS'
export const REGISTER_FAIL = 'REGISTER_FAIL'
export const FIRSTNAME_CHANGED = 'FIRSTNAME_CHANGED'
export const LASTNAME_CHANGED = 'LASTNAME_CHANGED'
export const MOBILE_CHANGED = 'MOBILE_CHANGED'
export const DISPLAYNAME_CHANGED = 'DISPLAYNAME_CHANGED'

// game realted
export const TEAMS_URL = '/teams'
export const KNOCKOUT_URL = '/knockout'
export const STADIUMS_URL = '/stadiums'
export const PLAYERS_URL = '/players'
export const GROUPS_URL = '/groups'
export const USERS_URL = '/users'
export const PREDICTIONS_URL = '/predictions'
export const FINISHED_MATCHES_URL = '/finishedMatches'
export const CLEANUP = 'CLEANUP'
export const LOAD_GAMES = 'LOAD_GAMES'
export const LOAD_USERS = 'LOAD_USERS'
export const LOAD_TEAMS = 'LOAD_TEAMS'
export const SELECT_GAME = 'SELECT_GAME'
export const LOAD_PREDICTIONS = 'LOAD_PREDICTIONS'
export const SET_CURRENT_GROUPID = 'SET_CURRENT_GROUPID'
export const UPDATE_POINTS_TO_PREDICTION = 'UPDATE_POINTS'
export const LIVE_DATA = 'LIVE_DATA'

//  app actions native -> react navigation root types
export const CHECK_NET_INFO = 'CHECK_NET_INFO'
export const ADD_ICON = 'ADD_ICON'
export const ROOT_CHANGED = 'ROOT_CHANGED'
export const CALCULATE_POINTS = 'CALCULATE_POINTS'

// app constants
export const MODE_LIST = 'MODE_LIST'
export const MODE_SINGLE = 'MODE_SINGLE'
export const LOADING = 'LOADING'
export const LOAD_REGISTERED_USERS = 'LOAD_REGISTERED_USERS'
export const USER_ALREADY_LOGGED_IN = 'USER_ALREADY_LOGGED_IN'

// menu

export const MENU = [
  'My Predictions',
  'LeaderBoard',
  'Finished Matches',
  'Clans',
  'Logout'
]

export const groupCodes = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h'
]
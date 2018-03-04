import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_PROCESS, LOGIN_FAIL } from './types'
import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'

/**
  * @desc text changes are updated to store
*/
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

/**
  * @desc text changes are updated to store
*/
export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

/**
  * @desc login status is updated in  store
*/
export const loginSuccess = (user) => {
  return {
    type: LOGIN_SUCCESS,
    payload: user
  }
}
/**
  * @desc login process initiates here
  * @desc if user's email id  is already present in db then user is authenticated
  * @desc if valid user then returns success
  * @desc if user email id is not present new user is create with the passed email id and password
  * @param string email
  * @param string password
  * @returns  if valid user returns success and navigateed to dashboard screen
  * @returns if invalid user returns failure
  * @desc also in both the cases redux store is udpdated by dispatching corresponding actions
*/
export const loginAction = (email, password) => {
  console.log(email, password)
  return (dispatch) => {
    dispatch({type: LOGIN_PROCESS})
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({type: LOGIN_SUCCESS, payload: user})
        Actions.dashboard()
      })
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => {
            dispatch({type: LOGIN_SUCCESS, payload: user})
            Actions.dashboard()
          })
          .catch(err =>
            dispatch({type: LOGIN_FAIL,payload: err})
          )
      })
  }
}

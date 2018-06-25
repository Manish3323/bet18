import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_PROCESS, LOGIN_FAIL, LOGOUT, LOADING, CLEANUP, INCORRECT_CREDENTIALS, REGISTER_USER_PROCESS, REGISTER_FAIL, REGISTER_USER_SUCCESS, INVALID_PASSWORDS, CURRENT_PASSWORD_CHANGED, USER_ALREADY_LOGGED_IN, USERS_URL, FIRSTNAME_CHANGED, LASTNAME_CHANGED, DISPLAYNAME_CHANGED, MOBILE_CHANGED, PASSWORD_RESET_MAIL_SENT, PASSWORD_RESET_MAIL_FAILED } from './types'
import firebase from 'firebase'
import { Alert } from 'react-native'
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
  * @desc text changes are updated to store
*/
export const currentPasswordChanged = (text) => {
  return {
    type: CURRENT_PASSWORD_CHANGED,
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
  * @desc text changes are updated to store
*/
export const firstNameChanged = (text) => {
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  }
}
/**
  * @desc text changes are updated to store
*/
export const lastNameChanged = (text) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  }
}
/**
  * @desc text changes are updated to store
*/
export const displayNameChanged = (text) => {
  return {
    type: DISPLAYNAME_CHANGED,
    payload: text
  }
}
/**
  * @desc text changes are updated to store
*/
export const mobileChanged = (text) => {
  return {
    type: MOBILE_CHANGED,
    payload: text
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
  if (email && password) {
    return (dispatch) => {
      dispatch({type: LOGIN_PROCESS})
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then(user => {
          dispatch({type: LOGIN_SUCCESS, payload: user})
        })
        .catch((err) => {
          console.log(err)
          dispatch({type: LOGIN_FAIL, payload: err})
        })
    }
  } else {
    return (dispatch) => dispatch({type: INCORRECT_CREDENTIALS})
  }
}
/**
  * @desc creates a new user in firebase
  * @returns newly created user
  */
export const registerUser = (email, password, displayName, mobile, firstName, lastName) => {
  return (dispatch) => {
    dispatch({type: REGISTER_USER_PROCESS})

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => {
        dispatch({type: REGISTER_USER_SUCCESS, payload: user})
        if (firebase.auth().currentUser) {
          let userId = firebase.auth().currentUser.uid
          if (userId) {
            const currentTime = new Date().getTime()
            firebase.database().ref(USERS_URL + '/' + userId).update({
              firstName: firstName,
              lastName: lastName,
              displayName: displayName,
              email: email,
              mobile: mobile,
              creationTime: currentTime
            }).then((res) => {
              console.log('data succesfully added')
            })
          }
        }
      }).catch(err => {
        console.log(err)
        dispatch({type: REGISTER_FAIL, payload: err.message})
      })
  }
}

/**
  * @desc logs out user from firebase auth() if logged in
  * @desc cleanup action is dispatched which remove user related redux store data
*/
export const logoutAction = () => {
  return (dispatch) => {
    if (firebase.auth().currentUser) {
      firebase.auth().signOut().then(() => {
        dispatch({type: LOGOUT})
        dispatch({type: CLEANUP})
      })
    }
  }
}
/**
  * @desc updates store with error in case of incorrect password and confirmpassword text
*/
export const invalidPasswords = () => {
  return {
    type: INVALID_PASSWORDS,
    payload: 'Passwords must match'
  }
}
/**
  * @desc updates store  error in case of incorrect email and password
*/
export const incorrectCredentials = () => {
  return {
    type: INCORRECT_CREDENTIALS,
    payload: 'Enter Valid Data'
  }
}

/**
 * @desc checks if user already is logged in
 */
export const checkIfAlreadyLogin = () => {
  return (dispatch) => {
    dispatch({type: LOADING})
    firebase.auth().onAuthStateChanged((user) => {
      return dispatch({type: USER_ALREADY_LOGGED_IN, payload: user})
    })
  }
}

/**
 * @desc checks if user already is logged in
 */
export const forgotPass = (email) => {
  return (dispatch) => {
    dispatch({type: LOADING})
    firebase.auth().sendPasswordResetEmail(email).then((user) => {
      Alert.alert(`Mail Sent Successfully!!
        follow the link to reset password.`)
      return dispatch({type: PASSWORD_RESET_MAIL_SENT})
    }).catch((err) => {
      return dispatch({type: PASSWORD_RESET_MAIL_FAILED, payload: err})
    })
  }
}

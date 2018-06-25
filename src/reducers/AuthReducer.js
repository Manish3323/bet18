import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PROCESS, LOGOUT, REGISTER_USER_PROCESS, REGISTER_USER_SUCCESS, REGISTER_FAIL, INCORRECT_CREDENTIALS, CURRENT_PASSWORD_CHANGED, INVALID_PASSWORDS, USER_ALREADY_LOGGED_IN, LOADING, FIRSTNAME_CHANGED, LASTNAME_CHANGED, DISPLAYNAME_CHANGED, MOBILE_CHANGED, PASSWORD_RESET_MAIL_SENT, PASSWORD_RESET_MAIL_FAILED } from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: ''
}

export default AuthReducer = (state = INITIAL_STATE, action) => {
 
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' }
    case CURRENT_PASSWORD_CHANGED:
      return { ...state, currentPassword: action.payload, error: '' }
    case LOGIN_SUCCESS:
      return { ...state, email: '', password: '', error: '', loading: false, user: action.payload }
    case LOGIN_FAIL:
      return { ...state, password: '', error: 'Login Failed', loading: false }
    case LOGIN_PROCESS:
      return { ...state, loading: true }
    case LOGOUT:
      return { ...state, user: null }
    case REGISTER_USER_PROCESS: {
      return { ...state, loading: true }
    }
    case REGISTER_USER_SUCCESS: {
      return { ...state, email: '', password: '', error: '', loading: false, user: action.payload }
    }
    case REGISTER_FAIL : {
      return { ...state, error: action.payload, loading: false }
    }
    case INCORRECT_CREDENTIALS: {
      return { ...state, error: action.payload, loading: false }
    }
    case INVALID_PASSWORDS : {
      return { ...state, error: action.payload, loading: false }
    }
    case USER_ALREADY_LOGGED_IN : {
      return { ...state, user: action.payload, loading: false }
    }
    case LOADING : {
      return { ...state, loading: true }
    }
    case FIRSTNAME_CHANGED:
      return { ...state, firstName: action.payload, error: '' }
    case LASTNAME_CHANGED:
      return { ...state, lastName: action.payload, error: '' }
    case DISPLAYNAME_CHANGED:
      return { ...state, displayName: action.payload, error: '' } 
    case MOBILE_CHANGED:
      return { ...state, mobile: action.payload, error: '' } 
    case PASSWORD_RESET_MAIL_SENT:
      return { ...state, mailSent: action.payload, error: '' } 
    case PASSWORD_RESET_MAIL_FAILED:
      return { ...state, mailSent: action.payload, error: 'Couldn\'t Send Mail. Try Again!!' }
    default: return state
  }
}

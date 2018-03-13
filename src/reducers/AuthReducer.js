import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PROCESS, LOGOUT, REGISTER_USER_PROCESS, REGISTER_USER_SUCCESS, REGISTER_FAIL, INCORRECT_CREDENTIALS, CURRENT_PASSWORD_CHANGED, INVALID_PASSWORDS } from '../actions/types'

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
      return { ...state,loading: true }
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
    default: return state
  }
}

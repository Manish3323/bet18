import { EMAIL_CHANGED, PASSWORD_CHANGED, LOGIN_SUCCESS, LOGIN_FAIL, LOGIN_PROCESS, LOGOUT } from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  error: '',
  loading: ''
}

export default AuthReducer = (state = INITIAL_STATE, action) => {
  console.log(action.type)
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload, error: '' }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload, error: '' }
    case LOGIN_SUCCESS:
      return { ...state, email: '', password: '', error: '', loading: false, user: action.payload }
    case LOGIN_FAIL:
      return { ...state, password: '', error: 'Login Failed', loading: false }
    case LOGIN_PROCESS:
      return { ...state, loading: true }
    case LOGOUT:
      return { ...state, user: {} }
    default: return state
  }
}

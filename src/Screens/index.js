import { Navigation } from 'react-native-navigation'
import LoginForm from '../components/LoginForm'
import SelectedGameComponent from '../components/SelectedGameComponent'
import MatchesList from '../components/MatchesList'
import GroupList from '../components/GroupComponent'
import ContextMenu from '../components/common/Menu'
import RegisterForm from '../components/RegisterForm'
import PredictionsComponent from '../components/PredictionsComponent'
import LeaderBoard from '../components/LeaderBoardComponent'
import ClansComponent from '../components/ClansComponent'
// register all screens of the app (including internal ones)
export function registerScreens (store, provider) {
  // Navigation.registerComponent('bet18', () => App)
  Navigation.registerComponent('dashboard', () => GroupList, store, provider)
  Navigation.registerComponent('LoginScreen', () => LoginForm, store, provider)
  Navigation.registerComponent('SelectedGame', () => SelectedGameComponent, store, provider)
  Navigation.registerComponent('MatchesList', () => MatchesList, store, provider)
  Navigation.registerComponent('drawerScreen', () => ContextMenu, store, provider)
  Navigation.registerComponent('RegisterForm', () => RegisterForm, store, provider)
  Navigation.registerComponent('PredictionsScreen', () => PredictionsComponent, store, provider)
  Navigation.registerComponent('LeaderboardScreen', () => LeaderBoard, store, provider)
  Navigation.registerComponent('ClanScreen', () => ClansComponent, store, provider)
  
}

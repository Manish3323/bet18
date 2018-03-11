import { Navigation } from 'react-native-navigation'
import DashBoard from '../components/Dashboard'
import LoginForm from '../components/LoginForm';
import SelectedGameComponent from '../components/SelectedGameComponent';
import MatchesList from '../components/MatchesList';
import GroupList from '../components/GroupComponent'
import { ContextMenu } from '../components/common/Menu'
// register all screens of the app (including internal ones)
export function registerScreens ( store, provider ) {
  // Navigation.registerComponent('bet18', () => App)
  Navigation.registerComponent('dashboard', () => GroupList, store, provider)
  Navigation.registerComponent('LoginScreen', () => LoginForm, store, provider)
  Navigation.registerComponent('SelectedGame', () => SelectedGameComponent, store, provider)
  Navigation.registerComponent('MatchesList', () => MatchesList, store, provider)
  Navigation.registerComponent('drawerScreen', () => ContextMenu, store, provider)
  
}

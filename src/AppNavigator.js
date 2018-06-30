import React from 'react'
import { connect } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator, createSwitchNavigator } from 'react-navigation'
import { reduxifyNavigator, createReactNavigationReduxMiddleware } from 'react-navigation-redux-helpers'
import LoginForm from './components/LoginForm'
import ForgotForm from './components/ForgotForm'
import RegisterForm from './components/RegisterForm'
import GroupComponent from './components/GroupComponent'
import FeedComponent from './components/FeedComponent'
import CurrentMatchComponent from './components/CurrentMatchComponent'
import LeaderBoardComponent from './components/LeaderBoardComponent'
import SelectedGameComponent from './components/SelectedGameComponent'
import PredictionsComponent from './components/PredictionsComponent'
import Menu from './components/common/Menu'
import Icons from 'react-native-vector-icons/Ionicons'
import EventSelectedComponent from './components/EventSelectedComponent';
const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
)

const AppStack = createStackNavigator({
  GroupComponent: {
    screen: GroupComponent,
    navigationOptions: () => ({
      title: `Group Matches`,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    })
  },
  CurrentMatch: { screen: CurrentMatchComponent },
  Leader: { screen: LeaderBoardComponent,
    navigationOptions: () => ({
      title: `LeaderBoard`,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    })
  },
  SelectedGame: { screen: SelectedGameComponent },
  SelectedEvent: { screen: EventSelectedComponent },
  Predictions: { screen: PredictionsComponent,
    navigationOptions: () => ({
      title: `Your Predictions`,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    }) }
})
const AuthStack = createStackNavigator({
  LoginForm: {
    screen: LoginForm,
    navigationOptions: () => ({
      title: `Login`,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerTransparent: true
    })
  },
  Forgot: {
    screen: ForgotForm,
    navigationOptions: () => ({
      title: ` Reset Password `,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerTintColor: '#030303'
    })
  },
  Register: {
    screen: RegisterForm,
    navigationOptions: () => ({
      title: `World of FIFA `,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      },
      headerTintColor: '#030303'
    })
  }
})

const BottomTabNavigator = createBottomTabNavigator({
  Settings: {
    screen: Menu
  },
  Home: AppStack,
  Recent: {
    screen: FeedComponent,
    navigationOptions: () => ({
      title: `Updates`,
      headerTitleStyle: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center'
      }
    }),
    headerMode:'screen'
  }
},
{
  initialRouteName: 'Home',
  activeTintColor: '#e91e63',
  labelStyle: {
    fontSize: 16
  },
  tabBarOptions: {
    activeTintColor: 'black',
    activeBackgroundColor: '#b3d9ff',
    inactiveBackgroundColor: 'grey',
    inactiveTintColor: 'white',
    showIcon: true,
    padding: 5
  }
})

const RootNavigator = createSwitchNavigator(
  {
    App: BottomTabNavigator,
    Auth: AuthStack
  },
  {
    initialRouteName: 'Auth'
  }

)
const AppWithNavigationStateMain = reduxifyNavigator(RootNavigator, 'root')
const mapStateToProps = state => ({
  state: state.nav
})

const AppNavigator = connect(mapStateToProps)(AppWithNavigationStateMain)

export { RootNavigator, AppNavigator, middleware }

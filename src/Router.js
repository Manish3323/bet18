import React, { Component } from 'react'
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Router, Scene, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import firebase from 'firebase'
import SelectedGameComponent from './components/SelectedGameComponent'
import { Icon } from 'react-native-elements'

class RouterComponent extends Component {
    renderLogout = () => {
      if(firebase.auth().currentUser){
        return(<View>
          <TouchableOpacity onPress= {this.onPressRight.bind()} style={styles.iconStyle}>
            <Icon
              name="menu"
            />
          </TouchableOpacity>
        </View>);
      }
    }
  
  onPressRight () {
    Actions.loginForm({action:'logout'});
  }
  render () {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="auth" >
            <Scene key="loginForm" component={LoginForm}  title="BET 18" initial/>
          </Scene>
          <Scene key="main" renderRightButton={ () => this.renderLogout()}>
              <Scene icon={ () => this.renderLogout()} renderBackButton={()=>(null)} key="dashboard" component={Dashboard} initial title="BET 18"/>
              <Scene key="selectedGame" component={SelectedGameComponent} title="BET 18"/>
          </Scene>
        </Scene>
      </Router>
    )
  }
}
const styles = StyleSheet.create({
  iconStyle:{
    marginRight:20
  }
})
export default RouterComponent
//  <Scene key="tabMain" tabs={true}> </Scene>
// /
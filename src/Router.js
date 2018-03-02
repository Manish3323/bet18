import React,{ Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import SelectedGameComponent from './components/SelectedGameComponent';
class  RouterComponent extends Component {
   render(){
       return(
            <Router>
                <Scene key="root" hideNavBar>
                    <Scene key="auth">
                        <Scene key="loginForm" component={LoginForm} title="BET 18" initial/>
                    </Scene>
                    <Scene key="main">
                        <Scene key="dashboard" component={Dashboard} title="BET 18"/>
                        <Scene key="selectedGame" component={SelectedGameComponent} title="BET 18"/>
                    </Scene>
                </Scene>
            </Router>
        )
   } 
} 

export default RouterComponent;
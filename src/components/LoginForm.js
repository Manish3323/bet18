import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { emailChanged, passwordChanged, loginAction, logoutAction, checkIfAlreadyLogin } from '../actions'
import { Card, Input, Spinner, CardSection } from './common'
import { connect } from 'react-redux'
import { styles } from '../styles/LoginformStyles'
import { Button } from 'react-native-elements'
import { LOGIN } from '../actions/types'

class LoginForm extends Component {
  componentWillMount () {
    this.props.checkIfAlreadyLogin()
  }
  onButtonPress () {
    const { email, password } = this.props
    this.props.loginAction(email, password)
  }
  onEmailChangeText (text) {
    this.props.emailChanged(text)
  }
  onPasswordChangeText (text) {
    this.props.passwordChanged(text)
  }
  renderButton () {
    if (this.props.loading) {
      return <Spinner size="small"/>
    }
    return <Button raised color="cyan" onPress={this.onButtonPress.bind(this)} title={LOGIN} />
  }
  renderLogin = () => {
    if(this.props.loading){
      return  <Spinner size="large"/>
    }else {
      const { email, password, error } = this.props
      return (
        <View>
         
          <Card cardStyle={cardStyle}>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input label="Email" propsLabelstyle={labelStyle} value={email} placeholder="User@gmail.com" onChangeText={this.onEmailChangeText.bind(this)}/>
            </CardSection>

            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input propsLabelstyle={labelStyle} label="Password" password={true} value={password} placeholder="Password" onChangeText={ this.onPasswordChangeText.bind(this) } />
            </CardSection>
            
            <Text style={errorStyle}>{error}</Text>
            
            <CardSection cardSectionStyle={cardSectionStyle}>
              {this.renderButton()}
            </CardSection>
          </Card>
          
          <Card style={registerCard}>
            <CardSection cardSectionStyle={{flexDirection:'row',alignItems: 'center'}}>
              <TouchableOpacity onPress={() => this.props.navigator.push({screen: 'RegisterForm', title: 'Create Account'})}>
                <Text style={{alignSelf:'center'}}> Create An Account ? </Text>
              </TouchableOpacity>
            </CardSection>
          </Card>
        
        </View>
      )
    }
  }
  render () {
    return (
      this.renderLogin()
    )
  }
}

const mapStateToProps = (state) => {
  const { email, password, error, loading, user } = state.Auth
  return {
    email: email,
    password: password,
    error: error,
    loading: loading,
    user: user
  }
}

const { errorStyle, cardStyle, cardSectionStyle, labelStyle, registerCard } = styles
export default connect(mapStateToProps, { emailChanged, passwordChanged, checkIfAlreadyLogin, loginAction, logoutAction })(LoginForm)

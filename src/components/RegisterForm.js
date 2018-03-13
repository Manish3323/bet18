import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { emailChanged, passwordChanged, currentPasswordChanged, invalidPasswords, incorrectCredentials, registerUser } from '../actions'
import { Card, Input, Spinner, CardSection } from './common'
import { connect } from 'react-redux'
import { styles } from '../styles/LoginformStyles'
import { Button } from 'react-native-elements'
import { SIGNUP } from '../actions/types'

class RegisterForm extends Component {
  onButtonPress () {
    const { email, password, currentPassword } = this.props
    if (email && password) {
      if (password === currentPassword) {
        this.props.registerUser(email, password)
      } else {
        this.props.invalidPasswords()
      }
    } else {
      this.props.incorrectCredentials()
    }
  }
  onEmailChangeText (text) {
    this.props.emailChanged(text)
  }
  onPasswordChangeText (text) {
    this.props.passwordChanged(text)
  }
  onCurrentPasswordChangeText (text) {
    this.props.currentPasswordChanged(text)
  }
  renderButton () {
    if (this.props.loading) {
      return <Spinner size="small"/>
    }
    return <Button raised color="cyan" onPress={this.onButtonPress.bind(this)} title={SIGNUP} />
  }

  render () {
    const { email, password, confirmPassword, error } = this.props
    console.log(this.props)
    return (
      <Card cardStyle={cardStyle}>
        <CardSection cardSectionStyle={cardSectionStyle}>
          <Input label="Email" propsLabelstyle={labelStyle} value={email} placeholder="User@gmail.com" onChangeText={this.onEmailChangeText.bind(this)}/>
        </CardSection>
        <CardSection cardSectionStyle={cardSectionStyle}>
          <Input propsLabelstyle={labelStyle} label="Password" password={true} value={password} placeholder="Password" onChangeText={ this.onPasswordChangeText.bind(this) } />
        </CardSection>
        <CardSection cardSectionStyle={cardSectionStyle}>
          <Input propsLabelstyle={labelStyle} label="Confirm Password" password={true} value={confirmPassword} placeholder="Password" onChangeText={ this.onCurrentPasswordChangeText.bind(this) } />
        </CardSection>
        <Text style={errorStyle}>{error}</Text>
        <CardSection cardSectionStyle={cardSectionStyle}>
          {this.renderButton()}
        </CardSection>
      </Card>
    )
  }
}

const mapStateToProps = (state) => {
  const { email, password, currentPassword, error, loading, user } = state.Auth
  console.log(state.Auth)
  return {
    email: email,
    password: password,
    error: error,
    loading: loading,
    user: user,
    currentPassword: currentPassword
  }
}

const { errorStyle, cardStyle, cardSectionStyle, labelStyle } = styles

export default connect(mapStateToProps, { emailChanged, passwordChanged, incorrectCredentials, registerUser, currentPasswordChanged, invalidPasswords })(RegisterForm)

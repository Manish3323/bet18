import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { emailChanged, passwordChanged, firstNameChanged, lastNameChanged, displayNameChanged, currentPasswordChanged, invalidPasswords, incorrectCredentials, registerUser, mobileChanged } from '../actions'
import { Card, Input, Spinner, CardSection } from './common'
import { connect } from 'react-redux'
import { styles } from '../styles/LoginformStyles'
import { Button } from 'react-native-elements'
import { SIGNUP } from '../actions/types'
import { MobileInput } from './common/NumberInput'
import { Header } from 'react-navigation'
import { getImage } from '../Utility'

class RegisterForm extends Component {
  onButtonPress () {
    const { email, password, currentPassword, displayName, mobile, firstName, lastName } = this.props
    if (email && password && displayName && mobile && firstName && lastName) {
      if (password === currentPassword) {
        this.props.registerUser(email, password, displayName, mobile, firstName, lastName)
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
  onFirstNameChangeText (text) {
    this.props.firstNameChanged(text)
  }
  onLastNameChangeText (text) {
    this.props.lastNameChanged(text)
  }
  onDisplayNameChangeText (text) {
    this.props.displayNameChanged(text)
  }
  onMobileChangeText (text) {
    this.props.mobileChanged(text)
  }
  renderButton () {
    if (this.props.loading) {
      return <Spinner size="small"/>
    }
    return <Button raised color="cyan" onPress={this.onButtonPress.bind(this)} title={SIGNUP} />
  }

  render () {
    const { email, password, firstName, confirmPassword, error, lastName, displayName, mobile } = this.props
    console.log(this.props)
    return (
      <ImageBackground source={getImage('fifaCupBlackSrc')}
        style={{width: '100%', height: '100%', flex: 1}}>
        <View style={{ paddingTop: Header.HEIGHT, marginLeft: '5%', marginRight: '5%' }}>
          <Card cardStyle={cardStyle}>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input label="First Name" propsLabelstyle={labelStyle} value={firstName} placeholder="john" onChangeText={this.onFirstNameChangeText.bind(this)}/>
            </CardSection>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input propsLabelstyle={labelStyle} label="Last Name" value={lastName} placeholder="Cena" onChangeText={ this.onLastNameChangeText.bind(this) } />
            </CardSection>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input propsLabelstyle={labelStyle} label="Display Name" value={displayName} placeholder="U_CAnT_see_ME" onChangeText={ this.onDisplayNameChangeText.bind(this) } />
            </CardSection>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <MobileInput propsLabelstyle={labelStyle} label="Mobile" value={mobile} placeholder="93424343411" onChangeText={ this.onMobileChangeText.bind(this) } />
            </CardSection>
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
        </View>
      </ImageBackground>
    )
  }
}

const mapStateToProps = (state) => {
  const { email, password, currentPassword, error, loading, user, firstName, lastName, displayName, mobile } = state.Auth
  console.log(state.Auth)
  return {
    email: email,
    password: password,
    error: error,
    loading: loading,
    user: user,
    currentPassword: currentPassword,
    firstName: firstName,
    lastName: lastName,
    displayName: displayName,
    mobile: mobile
  }
}

const { errorStyle, cardStyle, cardSectionStyle, labelStyle } = styles

export default connect(mapStateToProps, { emailChanged, passwordChanged, firstNameChanged, lastNameChanged, displayNameChanged, mobileChanged, incorrectCredentials, registerUser, currentPasswordChanged, invalidPasswords })(RegisterForm)

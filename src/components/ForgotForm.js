import React, { Component } from 'react'
import { View, StyleSheet, Text, ImageBackground } from 'react-native'
import { emailChanged, passwordChanged, forgotPass } from '../actions'
import { Card, Input, Spinner, CardSection } from './common'
import { connect } from 'react-redux'
import { styles } from '../styles/LoginformStyles'
import { Button } from 'react-native-elements'
import { SIGNUP, SEND_MAIL } from '../actions/types'
import { MobileInput } from './common/NumberInput'
import { Header } from 'react-navigation'
import { getImage } from '../Utility'
class ForgotForm extends Component {
  onButtonPress () {
    const { email } = this.props
    if (email) {
      this.props.forgotPass(email)
    }
  }
  onEmailChangeText (text) {
    this.props.emailChanged(text)
  }
  renderButton () {
    if (this.props.loading) {
      return <Spinner size="small"/>
    }
    return <Button raised color="cyan" onPress={this.onButtonPress.bind(this)} title={SEND_MAIL} />
  }

  render () {
    const { email, error } = this.props
    console.log(this.props)
    return (
      <ImageBackground source={getImage('fifaCupBlackSrc')}
        style={{width: '100%', height: '100%', flex: 1}}>
        <View style={{ paddingTop: Header.HEIGHT, marginLeft: '5%', marginRight: '5%' }}>
          <Card cardStyle={cardStyle}>
            <CardSection cardSectionStyle={cardSectionStyle}>
              <Input label="Email" propsLabelstyle={labelStyle} value={email} placeholder="User@gmail.com" onChangeText={this.onEmailChangeText.bind(this)}/>
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
  const { email, error, mailSent } = state.Auth
  return {
    email: email,
    error: error,
    mailSent: mailSent
  }
}

const { errorStyle, cardStyle, cardSectionStyle, labelStyle } = styles

export default connect(mapStateToProps, { emailChanged, passwordChanged, forgotPass })(ForgotForm)

import React,{ Component } from 'react';
import { View,StyleSheet,Text } from 'react-native';
import { emailChanged, passwordChanged,loginAction } from '../actions';
import { Card,Input,Spinner,CardSection,Button } from './common';
import {connect } from 'react-redux';

class LoginForm extends Component{
    
    onButtonPress(){
        const { email, password } = this.props;
        this.props.loginAction(email,password);
    }
    onEmailChangeText(text){
        this.props.emailChanged(text);
    }
    onPasswordChangeText(text){
        this.props.passwordChanged(text);
    }
    renderButton(){
        if(this.props.loading){
            return <Spinner size="small"/>
        }
        return <Button onPress={this.onButtonPress.bind(this)} buttontext="Log In" /> 
    }

  
    render(){
        const { email,password,error } = this.props;
        const { cardStyle,cardSectionStyle } = styles;
        return(
            <Card style={cardStyle}>
                <CardSection style={ cardSectionStyle }>
                    <Input label="email" value={email} placeholder="User@gmail.com" onChangeText={this.onEmailChangeText.bind(this)}/>
                </CardSection>
                <CardSection style={ cardSectionStyle }>
                    <Input label="password" password={true} value={password} placeholder="Password" onChangeText={ this.onPasswordChangeText.bind(this) } />
                </CardSection>
                <Text style={styles.errorStyle}>{error}</Text>
                <CardSection style={ cardSectionStyle }>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

mapStateToProps = (state) => {
    const { email,password,error,loading,user } = state.Auth;
    return {
        email:email,
        password:password,
        error:error,
        loading:loading,
        user:user
    };
}



const styles=StyleSheet.create({
    errorStyle:{
        fontSize:20,
        alignSelf:'center',
        color:'red'
    },
    cardStyle:{
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10
    },
    cardSectionStyle:{
            borderBottomWidth: 1,
         
            padding: 5,
            backgroundColor: '#fff',
            justifyContent: 'space-around',
            flexDirection: 'row',
            borderColor: '#ddd',
            position: 'relative'
    }
});

export default connect(mapStateToProps,{ emailChanged,passwordChanged,loginAction})(LoginForm);
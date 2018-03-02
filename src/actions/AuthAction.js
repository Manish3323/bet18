import {EMAIL_CHANGED, PASSWORD_CHANGED,LOGIN_SUCCESS,LOGIN_PROCESS,LOGIN_FAIL } from './types';
import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';

export const emailChanged = (text) => {
    return {
        type:EMAIL_CHANGED,
        payload:text
    }
}
export const passwordChanged = (text) => {
    return {
        type:PASSWORD_CHANGED,
        payload:text
    }
}
export const loginSuccess = (user) => {
    return {
        type:LOGIN_SUCCESS,
        payload:user
    }
}
export const loginAction = (email,password) => {
    console.log(email,password);
    return (dispatch)  => {
        dispatch({type:LOGIN_PROCESS});
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                dispatch({type:LOGIN_SUCCESS,payload:user})
                Actions.dashboard();
            })
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                .then(user =>{
                    dispatch({type:LOGIN_SUCCESS,payload:user});
                    Actions.dashboard();
                })
                .catch(err => dispatch({type:LOGIN_FAIL}));
            });
    }
}


import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { View,Text } from 'react-native';

class SelectedGameComponent extends Component{
    render(){
        return(
            <Text style={{alignItems:'center'}}>{this.props.name}</Text>
        );
    }
}
mapStateToProps = (state) => {
    console.log('state in game ',state.Game);
    return state.Game.selectedGame;
}
export default connect(mapStateToProps,{})(SelectedGameComponent);
// your entry point

import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Dimensions} from 'react-native'
import { connect } from 'react-redux'
import { Icon } from 'react-native-elements'
import { Card, CardSection } from '../common'
import { ROOT_CHANGED, MODE_LIST, MENU } from '../../actions/types'
import { changeAppRoot, logoutAction } from '../../actions'

class ContextMenu extends Component {
 
  onButtonPress = (index) => {
    switch (index) {
      case 0 : 
       this.props.navigation.navigate(
      'Predictions',
      ); break;
      case 1 : 
        this.props.navigation.navigate(
          'Leader',
         ); break;
      case 2 :
      //   this.props.navigation.navigate(
      //      'FinishedMatchesScreen',
      //  );
    break;
      case 3 :
        // this.props.navigation.navigate(
        //    'ClanScreen',
        //  );
          break;
      case 4 : 
        this.props.logoutAction();
        this.props.navigation.navigate('LoginForm'); break;
    }
  
  }
 
  renderMenu = () => {
    const length = MENU.length
    return MENU.map((item,i)=>{
      return ( 
        <TouchableOpacity key={i} onPress={this.onButtonPress.bind(this, i)}>
          <Card key={i} cardStyle={{width:(Dimensions.get('window').width / 2)}}>
            <CardSection cardSectionStyle={{backgroundColor:'#b3d9ff'}} >
              <Text> {item} </Text>
            </CardSection>
          </Card>
        </TouchableOpacity>
        )
    })
  }
  toggleSideMenu () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }
  showMenu = () => {
    const { viewStyle } = styles
    return (
      <View style={viewStyle}>
        {this.renderMenu()}
      </View>
    )
  }
  render () {
    return (
     this.showMenu()
    )
  }
}
const styles = StyleSheet.create({
  viewStyle:{
    flex:1,
    flexDirection: 'column',
    backgroundColor: '#4da6ff',
    alignItems:'center',
    justifyContent:'center'
  },
  iconStyle: {
    marginLeft: 50
  },
  cardStyle:{
    marginLeft: 50
  },
  logoutCard:{
    alignSelf:'flex-end'  
  }

})

const mapStateToProps = (state)=>{
  return state
}
export default connect(mapStateToProps,{ changeAppRoot,logoutAction })(ContextMenu)


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
       this.props.navigator.resetTo({
        screen:'PredictionsScreen',
        title:'My Predictions',
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade',
      }); break;
      case 1 : 
        this.props.navigator.resetTo({
          screen:'LeaderboardScreen',
          title:'LeaderBoard',
          animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
          animationType: 'fade',
        }); break;
      case 2 :
      this.props.navigator.resetTo({
        screen: 'FinishedMatchesScreen',
        title: 'Full Time Scores ',
        animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
        animationType: 'fade',
      }); break;
      case 3 :
        this.props.navigator.resetTo({
          screen: 'ClanScreen',
          title: 'My Clans',
          animated: true, // does the resetTo have transition animation or does it happen immediately (optional)
          animationType: 'fade',
        }); break;
      case 4 : 
        this.props.logoutAction();
        this.props.changeAppRoot('login'); break;
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
    backgroundColor: 'rgba(255,255,255,0.6)',
    alignItems:'flex-start',
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


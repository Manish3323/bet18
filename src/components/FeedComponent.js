import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View } from 'react-native'
import MaterialTabs from 'react-native-material-tabs'
class FeedComponent extends Component {
    state={
        selectedTab:1
    }
    renderFeed = () =>{
        if(this.state.selectedTab == 0 ){
            return(<Text>Finished Matches</Text>)
        }else if (this.state.selectedTab == 1 ){
            return(<Text>Current Matches</Text>)
        }else{
            return(<Text>Upcoming Matches</Text>)
        }
    }
  render () {
  
      return ( 
        <View style={{flexWrap:'wrap'}}>  
            <MaterialTabs  items={['Finished','Current','Upcoming']}
            selectedIndex={this.state.selectedTab}
            onChange={(index) => { 
                        this.setState({selectedTab:index});
                    }}
            barColor="#1fbcd2"
            indicatorColor="#fffe94"
            activeTextColor="white"
            textStyle={{ fontFamily: 'Papyrus' }}/>
           
                {this.renderFeed()}
            </View>
          )
    // } else {
    //   return <Text>Loading</Text>
    // }
  }
}
const mapStateToProps = state => {
  return {...state, liveFeed: state.liveFeed}
}

export default connect(mapStateToProps, {})(FeedComponent)

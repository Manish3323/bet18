import React, {Component} from 'react'
import { View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Spinner } from './common/Spinner'

class ClansComponent extends Component {
  componentWillMount () {
    //   this.props.fetchMyClans()
  }
  componentWillReceiveProps () {
    // this.props.fetchMyClans()
  }
  renderDefault () {

  }
  renderClans () {

  }
  render () {
    if (this.props.loading) return (<Spinner size='small'/>)
    else if (this.props.clans !== undefined && this.props.clans.length == 0) {
      return this.renderDefault()
    } else {
      return this.renderClans()
    }
  }
}
const stateMapToProps = (state) => {
  return state.Game
}
export default connect(stateMapToProps, {})(ClansComponent)

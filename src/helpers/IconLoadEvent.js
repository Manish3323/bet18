import Event from 'events'
import Icon from 'react-native-vector-icons/MaterialIcons'

class IconLoadEventEmitter extends Event {
  constructor () {
    super()
    this.emitter = new Event.EventEmitter()
    this.emitter.addListener('loadImage', function (iconName, size, color, displayName, count) {
      Icon.getImageSource(iconName, size, color).then((data) => {
        this.emitter.emit('load', data, displayName, count)
      }).catch((err) => {
        console.log(err)
        return 'error'
      })
    })
  }
}

export default IconLoadEventEmitter

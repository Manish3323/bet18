import App from './src/App'
import firebase from 'firebase'
var config = {
  apiKey: 'AIzaSyDuMWWsXCJ9yVMdjLPoN6h9KYAL6mTtDiU',
  authDomain: 'bet18-9fada.firebaseapp.com',
  databaseURL: 'https://bet18-9fada.firebaseio.com',
  projectId: 'bet18-9fada',
  storageBucket: 'bet18-9fada.appspot.com',
  messagingSenderId: '170655201334'
}
firebase.initializeApp(config)

const app = new App()

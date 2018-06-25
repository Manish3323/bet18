import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  cardStyle: {
    flexDirection: 'column',
    alignItems: 'center',
    opacity: 0.8,
    backgroundColor: '#C0C0C0'
  },
  cardSectionStyle: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    flexDirection: 'row'
  },
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
  labelStyle: {
    color: '#111',
    fontSize: 16,
  },
  registerCard:{
    alignItems: 'center',
    alignSelf: 'center',
    color: '#111'
  },
  container: { flex: 1, justifyContent: 'center', opacity: 0.8, marginLeft: '5%', marginRight: '5%' }
})
// .gradient2
//     {
//         background-color: #D46037;
//         /* For WebKit (Safari, Chrome, etc) */
//         background: #D46037 -webkit-gradient(linear, left top, left bottom, from(#D4C937), to(#D46037)) no-repeat;
//         /* Mozilla,Firefox/Gecko */
//         background: #D46037 -moz-linear-gradient(top, #D4C937, #D46037) no-repeat;
//         /* IE 5.5 - 7 */
//         filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=#D4C937, endColorstr=#D46037) no-repeat;
//         /* IE 8 */
//         -ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#D4C937, endColorstr=#D4C937)" no-repeat;
//     }

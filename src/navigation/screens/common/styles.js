import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  swgWrapper : {
    height:400,
    backgroundColor: '#11161D',
  },
  svgStyle: {
    backgroundColor: '#11161D',
    marginTop:0
  },
  cursor: {
    width:20,
    height: 20,
    borderRadius :3,
    borderColor : '#70A800',
    borderWidth: 2,
    backgroundColor: 'yellow',

  },
  period: {
    width: 45,
    height:30,
    backgroundColor:'transparent',
    borderWidth: 0.2,
    borderColor: "#daa520",
    justifyContent:'center',
    alignItems:'center',
    marginRight:5,
    marginLeft:5,
    borderRadius: 5
  },
  periodArea: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent:'center',
    marginTop: -15
  },
  periodText:{
    color:'#daa520'
  }
})

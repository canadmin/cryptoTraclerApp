import React from 'react'
import {Text,View} from 'react-native'
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  const {textStyle,viewStyle} = styles;
  const {headerText} = props;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>
        {headerText}
      </Text>
    </View>
  )
}


const styles = {
  textStyle: {
    fontSize:25,
    //textAlign:"center",
    color:"#beafaf",
    fontWeight:'bold'
  },
  viewStyle:{
    backgroundColor: "#5b5866",
    height:60,
    justifyContent: 'flex-start', // flex-end, flex-start
    //alignItems: flex-end , center, flex-start
    alignItems:'center',
    borderBottomLeftRadius:20,
    borderBottomRightRadius:20,
    shadowOffset:{width: 0, height: 2},
    shadowOpacity:1,
  }
};

export default Header;

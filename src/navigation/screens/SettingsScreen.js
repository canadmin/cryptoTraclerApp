import * as React from 'react';
import {View, Text} from 'react-native';
import Header from "./common/Header";

const SettingsScreen = () => {
  const {containerStyle,textStyle} = styles;
  return (<View style={containerStyle}>
    <Header headerText={"Settings"}></Header>
    <Text
      style={textStyle}
     >
    </Text>
  </View>)
};

const styles = {
  containerStyle : {
    flex :1,
    alignItems : 'center',
    backgroundColor: "#11161D",
  },
  textStyle : {
    color: 'red',
    fontWeight: 'bold'
  }
}

export default SettingsScreen;


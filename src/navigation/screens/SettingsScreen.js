import * as React from 'react';
import {View, Text} from 'react-native';

const SettingsScreen = () => {
  const {containerStyle,textStyle} = styles;
  return (<View style={containerStyle}>
    <Text
      style={textStyle}
     >
      Settings Screensdd
    </Text>
  </View>)
};

const styles = {
  containerStyle : {
    flex :1,
    alignItems : 'center',
    justifyContent: 'center'
  },
  textStyle : {
    color: 'red',
    fontWeight: 'bold'
  }
}

export default SettingsScreen;


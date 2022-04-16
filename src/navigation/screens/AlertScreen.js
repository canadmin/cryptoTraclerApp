import * as React from 'react';
import {View, Text} from 'react-native';

const AlertScreen = () => {
  const {containerStyle,textStyle} = styles;
  return (<View style={containerStyle}>
    <Text
      style={textStyle}
    >
      Alert Screen
    </Text>
  </View>)
};

const styles = {
  containerStyle : {
    flex :1,
    alignItems : 'center',
    backgroundColor: '#000',
  },
  textStyle : {
    color: 'red',
    fontWeight: 'bold'
  }
}

export default AlertScreen;


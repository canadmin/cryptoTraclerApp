import * as React from 'react';
import {View, Text} from 'react-native';

const PortfolioScreen = () => {
  const {containerStyle,textStyle} = styles;
  return (<View style={containerStyle}>
    <Text
      style={textStyle}
    >
      PortfolioScreen
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

export default PortfolioScreen;


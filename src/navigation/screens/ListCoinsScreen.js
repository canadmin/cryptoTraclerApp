import * as React from 'react';
import {View, Text} from 'react-native';

const ListCoinsScreen = () => {
  const {containerStyle,textStyle} = styles;
  return (<View style={containerStyle}>
    <Text
      style={textStyle}
    >
      ListCoinsScreen
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
    fontWeight: 'bold',
    color: 'red'
  }
}

export default ListCoinsScreen;


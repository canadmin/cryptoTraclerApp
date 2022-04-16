import * as React from 'react';
import {View, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from "./common/Header";
import ChartCustomThemes from "../../styles/ChartCustomThemes";
import LineChart from '../screens/common/LineChart'
const PortfolioScreen = () => {
  const {containerStyle,portfolioHeader,component1,totalValue} = styles;

  return (
    <View style={containerStyle}>
            <LineChart
            line_chart_data={[{month:'jan', value:300},
              {month:'Jan', value:300},
              {month:'Fen', value:400},
              {month:'Mar', value:200},
              {month:'Apr', value:304},
              {month:'May', value:234},
              {month:'June', value:423},]}
            circleColor={"#daa520"}
            axisColor={"#9dd"}
            />
  </View>)
};
//trending-up-sharp
const styles = {
  containerStyle : {
    flex :1,
    backgroundColor: "#262424",

  },
  portfolioHeader:{
    fontSize:24,
  },
  totalValue:{
    fontSize: 35,
    justifyContent: 'flex-start',
  },

}

//#041C32
//#04293A
//#ECB365
//#064663
//#141E27

export default PortfolioScreen;


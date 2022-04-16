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
      <Header headerText={"My Portfolio"}></Header>
            <LineChart
            line_chart_data={[{month:'jan', value:102},
              {month:'Jan', value:120},
              {month:'Fen', value:140},
              {month:'Mar', value:122},
              {month:'Apr', value:160},
              {month:'May', value:170},
              {month:'June', value:123},]}
            circleColor={"#daa520"}
            axisColor={"#9dd"}
            axisLabelFontSize={9}
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


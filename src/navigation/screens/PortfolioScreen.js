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
      <Header headerText={"My Portfolio"} isPortfolioScreen={true}/>
      <View>
        <Text style={{marginTop: 5, color:"white"}}>Total Value : 124,534.34 $ </Text>
        <Text style={{marginTop: 5, color:"white"}}>Change  : 8.33 % </Text>
      </View>
            <LineChart
            line_chart_data={[{time:'11 Feb', value:3422},
              {time:'12 Feb', value:3035.17},
              {time:'14 Feb', value:3033.27},
              {time:'15 Feb', value:2399.27},
              {time:'16 Feb', value:3033.27},
              {time:'17 Feb', value:933.27},
              {time:'18 Feb', value:2222.27},
            ]}
            circleColor={"#daa520"}
            axisColor={"#9dd"}
            axisLabelFontSize={9}
            renderCircleAndRect={false}
            showGradient={true}
            />
  </View>)
};
//trending-up-sharp
const styles = {
  containerStyle : {
    flex :1,
    backgroundColor: "#11161D",

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


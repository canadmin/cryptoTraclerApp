import * as React from 'react';
import {View, Text} from 'react-native';
import { VictoryBar,VictoryChart,VictoryLine,VictoryTheme } from "victory-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from "./common/Header";
import ChartCustomThemes from "../../styles/ChartCustomThemes";
const PortfolioScreen = () => {
  const {containerStyle,portfolioHeader,component1,totalValue} = styles;

  return (
    <View style={containerStyle}>
        <View style={component1}>
          <View>
            <Text style={totalValue}>$ 24.299</Text>
          </View>
          <View>
            <Text style={totalValue}>2.99 %</Text>
          </View>
          <View>
            <VictoryChart   theme={ChartCustomThemes}

            >
              <VictoryLine
                style={{
                  data: { stroke: "#ECB365" },
                  parent: { border: "1px solid #ECB365"}
                }}
                data={[
                  { x: 1, y: 2 },
                  { x: 2, y: 3 },
                  { x: 3, y: 5 },
                  { x: 4, y: 4 },
                  { x: 5, y: 7 },
                  { x: 6, y: 2 },
                  { x: 7, y: 3 },
                  { x: 8, y: 5 },
                  { x: 9, y: 4 },
                  { x: 10, y: 7 }
                ]}
              />
            </VictoryChart>
          </View>
    </View>
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
  component1:{
  },
  totalValue:{
    fontSize: 35,
    justifyContent: 'flex-start',
  },
  test: {

  }
}

//#041C32
//#04293A
//#ECB365
//#064663
//#141E27

export default PortfolioScreen;


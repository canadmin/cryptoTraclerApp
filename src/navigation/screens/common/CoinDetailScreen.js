import React from "react";
import {View,Text,Image} from 'react-native';
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addPageHistory } from "../../../redux/action";
import LineChart from "./LineChart";
import { green } from "react-native-reanimated/lib/types/lib/reanimated2";

const CoinDetailScreen = ({navigation,route}) => {
  const dispatch = useDispatch();
  const {pageHistory} = useSelector(state => state.userReducer)
  const {coinImage,coinPriceAndLogoView,textStyle,changePercentAreaUp} = styles;

  const handleHeaderBackOnPress = () => {

    //burada bağlı olan soketleri kapatacağız.
    navigation.navigate(pageHistory)
  }
  return (
    <View style={{flex:1,backgroundColor:'#11161D'}}>
      <Header headerText={route.params.name} isDetailScreen={true}  handleHeaderBackOnPress={handleHeaderBackOnPress}></Header>
      <View style={coinPriceAndLogoView}>
          <View style={{justifyContent:'flex-start',flex:1}}>
            <Image style={coinImage} source={{uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"}}/>
          </View>
        <View style={{justifyContent:'flex-end',flex:2,marginLeft:20}}>
          <Text style={textStyle}>$44.356,56</Text>
        </View>

      </View>

      <View style={changePercentAreaUp}>
        <Text style={{alignSelf:'center',color:'#ffffff',fontSize:33,}}>%7.33</Text>
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
        circleColor={"#70A800"}
        axisColor={"#9dd"}
        axisLabelFontSize={9}
        showGradient={false}
        containerHeight={300}
        lineChartColor={'#70A800'}
        renderCircleAndRect={false}
      />

      <View>

      </View>
  </View>)
}

const styles = {
  coinImage : {
    flex: 1, marginTop:10, marginRight:10, marginBottom: 10,
    justifyContent:'flex-start',height: undefined, width: undefined, resizeMode: 'contain'
  },
  coinPriceAndLogoView: {
    flexDirection:'row',
    height: 70,
    //alignItems: flex-end , center, flex-start
    alignItems: "center",
    marginLeft:20,
    marginRight:30,

  },
  textStyle:{
    color:'#70A800',
    fontSize:36,
    alignItems: "center",

  },
  changePercentAreaUp:{backgroundColor:'#70A800',
    color:'#ffffff',
    alignSelf:'flex-end',
    justifyContent:'center',
    marginRight:50,
    padding:10,
    borderRadius:5
  },

};

export default CoinDetailScreen;

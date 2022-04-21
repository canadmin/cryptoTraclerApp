import React from "react";
import {View,Text,Image} from 'react-native';
import Header from "./Header";


const CoinDetailScreen = ({route}) => {

  const {coinImage,coinPriceAndLogoView,textStyle} = styles;
  return (
    <View style={{flex:1,backgroundColor:'#11161D'}}>
      <Header headerText={route.params.name} isDetailScreen={true}></Header>
      <View style={coinPriceAndLogoView}>
          <View style={{justifyContent:'flex-start',flex:1}}>
            <Image style={coinImage} source={{uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"}}/>
          </View>
        <View style={{justifyContent:'flex-end',flex:2,marginLeft:20}}>
          <Text style={textStyle}>$44.356,56</Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.4,
          opacity: 0.1,
          borderColor: "white",
          marginLeft: 25,
          marginRight: 25,
        }}
      />
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

  }
};

export default CoinDetailScreen;

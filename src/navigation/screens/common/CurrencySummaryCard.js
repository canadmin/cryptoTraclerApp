import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Colors from "../../../Colors";
import AssetExample from '../common/AssetExample';
const CurrencySummaryCard = (props) => {

  const { containerStyle, textStyle, upPriceStyle, downPriceStyle } = styles;
  const [price, setPrice] = useState(null);
  const [isUp, setIsUp] = useState(true);

  const round = (value, decimals) => {
    return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
  };

  useEffect(() => {
    try{
      let wss = new WebSocket("wss://stream.binance.com:9443/ws/" + props.item.symbol + "usdt@kline_1m");
      console.log(wss)
      wssConnection(wss);
      return () => {
        wss.close();
        setPrice("2343")
      };
    }catch (err){
      console.log(err)
    }
  }, [props.items]);

  const wssConnection = (wss) => {
    wss.onmessage = (msg) => {
      console.log(msg)
      let newPrice = JSON.parse(msg.data).k.c;
      setIsUp(newPrice > price ? true : false);
      if (newPrice > 1) {
        newPrice = round(newPrice, 2);
      }
      if (price !== newPrice) {
        setPrice(newPrice);
      }
    };

  };

  return (
    <View>
      <View style={containerStyle}>
        <View style={{flex:1}}>
          <Image           style={{  flex: 1, marginTop:10, marginRight:10, marginBottom: 10, justifyContent:'flex-start',height: undefined, width: undefined, resizeMode: 'contain' }}
                           source={{uri:'https://coinassets.s3.eu-central-1.amazonaws.com/'+props.item.symbol.toUpperCase() +'.png'}}></Image>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={textStyle}>
            {props.item.name}
          </Text>
          <Text style={{color:'white'}}>
            {props.item.symbol.toUpperCase()}
          </Text>
        </View>
        <View style={{flex:1}}>
          <AssetExample />

        </View>
        <View style={{ flex: 2 }}>
          <Text style={isUp ? upPriceStyle : downPriceStyle}>
            {price}$
          </Text>
        </View>
      </View>
      <View
        style={{
          borderWidth: 0.4,
          opacity: 0.1,
          borderColor: "white",
          marginLeft: 10,
          marginRight: 10,
        }}
      />
    </View>);
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    height: 60,
    borderRadius: 1,
  },
  textStyle: {
    fontWeight: "bold",
    color: "#F7F7F7",
    fontSize: 16,
  },
  upPriceStyle: {
    fontWeight: "bold",
    color: Colors.darkHighPrice,
    fontSize: 22,
    textAlign: "right",
  },
  downPriceStyle: {
    fontWeight: "bold",
    color: Colors.darkLowPrice,
    fontSize: 22,
    textAlign: "right",
  },
};

export default CurrencySummaryCard;

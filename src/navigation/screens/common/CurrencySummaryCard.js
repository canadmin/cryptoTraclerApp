import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";
import Colors from "../../../Colors";
import AssetExample from '../common/AssetExample';
import { getCurrenciesFromExtarnalApi, getImage } from "../../../reducers/CryptoApiService";
import Ionicons from 'react-native-vector-icons/Ionicons';

const CurrencySummaryCard = (props) => {
  const round = (value) => {
    if (value > 1) {
      return Number(Math.round(value + "e" + 2) + "e-" + 2);
    }else{
      return Number(Math.round(value + "e" + 8) + "e-" + 8);
    }
  };
  const { containerStyle, textStyle, upPriceStyle, downPriceStyle } = styles;
  const [price, setPrice] = useState(round(props.item.price));
  const [isUp, setIsUp] = useState(true);
  const [image,setImage] = useState({img:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"});


  useEffect(() => {

    this._interval = setInterval(() => {
      getCurrenciesFromExtarnalApi(props.item.symbol).then(response => {
        let externalData = response.data;
        if(externalData.last && externalData.last > 0 ){
          setPrice(round(externalData.last))
        }
      });
      }, 10000);
    getImage(props.item.symbol)
      .then(response => {
        console.log("asdasd",response.data.img)
        setImage({img:response.data.img})
      })

    try{
      let wss = new WebSocket("wss://stream.binance.com:9443/ws/" + props.item.symbol + "usdt@kline_1m");
      wssConnection(wss);
      return () => {
        wss.close();
        clearInterval(this._interval);
      };
    }catch (err){
      console.log(err)
    }
  }, [props.items]);

  const wssConnection = (wss) => {
    wss.onmessage = (msg) => {
      let newPrice = JSON.parse(msg.data).k.c;
      setIsUp(newPrice > price ? true : false);
       newPrice = round(newPrice);
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
                           source={{uri:image.img}}></Image>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={textStyle}>
            {props.item.name}
          </Text>
          <Text style={textStyle}>
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
        <View style={{flex:1,alignItems:'flex-end' }}>
          <Ionicons name={"star"} size={40} color={'blue'} />
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
    marginLeft: 0,
    marginRight: 0,
    height: 60,
    borderRadius: 1,
  },
  textStyle: {
    fontWeight: "bold",
    color: "#F7F7F7",
    fontSize: 12,
  },
  upPriceStyle: {
    fontWeight: "bold",
    color: Colors.darkHighPrice,
    fontSize: 16,
    textAlign: "right",
  },
  downPriceStyle: {
    fontWeight: "bold",
    color: Colors.darkLowPrice,
    fontSize: 16,
    textAlign: "right",
  },
};

export default CurrencySummaryCard;

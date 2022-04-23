import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../../../Colors";
import { getCurrenciesFromExtarnalApi, getImage } from "../../../reducers/CryptoApiService";
import Ionicons from 'react-native-vector-icons/Ionicons';

const CurrencySummaryCard = (props) => {
 // eğer getRealTimeData true ise websocket bağlantısı yapılacak.
  const {addCurrencyToFavorite,item,
    favorites,getRealTimeData,
    deleteCurrencyFromFavorite,
    navigateAndAddPageHistory,
    navigation,
  index} = props;
  const round = (value) => {
    if (value > 1) {
      return Number(Math.round(value + "e" + 2) + "e-" + 2);
    }else{
      return Number(Math.round(value + "e" + 8) + "e-" + 8);
    }
  };
  const { containerStyle, textStyle, upPriceStyle, downPriceStyle, coinImage } = styles;
  const [price, setPrice] = useState(round(item.price));
  const [isUp, setIsUp] = useState(true);
  const [image,setImage] = useState({img:"https://s2.coinmarketcap.com/static/img/coins/64x64/1.png"});
  const [isFavoriteCoin,setIsFavoriteCoin] = useState(false);

  useEffect(() => {
    const isFound = favorites.some(element => {
      if (element.symbol === item.symbol) {
        setIsFavoriteCoin(true)
      }
    });

    let interval = null;
    if(index < 100){
     interval = setInterval(() => {
      getCurrenciesFromExtarnalApi(item.symbol).then(response => {
        let externalData = response.data;
        if(externalData.last && externalData.last > 0 ){
          setPrice(round(externalData.last))
        }
      });
      }, 10000);
    }
    getImage(item.symbol)
      .then(response => {
        setImage({img:response.data.img})
      })

    if(getRealTimeData) {
      try{
        let wss = new WebSocket("wss://stream.binance.com:9443/ws/" + item.symbol + "usdt@kline_1m");
        wssConnection(wss);
        return () => {
          wss.close();
          if(index < 100){
            clearInterval(interval);
          }
        };
      }catch (err){
        console.log(err)
      }
    }
    return () => {
    setPrice(0)
    };
  }, [item]);

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

  const addFavorite = (coin) => {
    if(isFavoriteCoin){
      setIsFavoriteCoin(false);
      deleteCurrencyFromFavorite(coin)
    }else {
      setIsFavoriteCoin(true);
      addCurrencyToFavorite(coin)
    }

  }


  return (
    <TouchableOpacity onPress={() => navigateAndAddPageHistory("CoinDetailScreen",{name: item.name},"Watchlist")}>
      <View>
        <View style={containerStyle}>
          <View style={{flex:1}}>
            <Image style={coinImage} source={{uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/"+item.id+".png"}}/>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={textStyle}>
              {item.name}
            </Text>
            <Text style={textStyle}>
              {item.symbol.toUpperCase()}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={isUp ? upPriceStyle : downPriceStyle}>
              {price}$
            </Text>
          </View>
          <View style={{alignItems:'flex-end' ,marginLeft:10}}>
            <TouchableOpacity onPress={() => addFavorite({ symbol: item.symbol,
              name: item.name})}>
              <Ionicons name={isFavoriteCoin ? "star" : "star-outline"} size={30} color={'#a3bea3'} />
            </TouchableOpacity>
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
      </View>
    </TouchableOpacity>
    );
};

const styles = {
  containerStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 0,
    marginRight: 25,
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
    textAlign: "center",
  },
  coinImage : {
    flex: 1, marginTop:10, marginRight:10, marginBottom: 10,
    justifyContent:'flex-start',height: undefined, width: undefined, resizeMode: 'contain'
  }
};

export default CurrencySummaryCard;

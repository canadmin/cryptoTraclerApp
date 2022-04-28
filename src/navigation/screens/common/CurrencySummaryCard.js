import React, { useEffect, useState, memo, useRef } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Colors from "../../../Colors";
import { getCurrenciesFromExtarnalApi, getCurrencyPrice } from "../../../reducers/CryptoApiService";
import Ionicons from "react-native-vector-icons/Ionicons";
import { round } from "../../../helper/Utils";

const CurrencySummaryCard = (props) => {
  const {
    addCurrencyToFavorite, item,
    favorites, getRealTimeData,
    deleteCurrencyFromFavorite,
    navigateAndAddPageHistory,
    navigation,
    searchFromModal,
    searchFromCurrencyList,
    index,
  } = props;

  const { containerStyle, textStyle, upPriceStyle, downPriceStyle, coinImage } = styles;
  const [price, setPrice] = useState(round(item.price));
  const [isUp, setIsUp] = useState(true);
  const [isFavoriteCoin, setIsFavoriteCoin] = useState(false);
  const ws = useRef(null);


  const getRealTimeDataFromApi = () => {
    getCurrenciesFromExtarnalApi(item.symbol).then(response => {
      let externalData = response.data;
      if (externalData.last && externalData.last > 0) {
        setPrice(round(externalData.last));
      } else {
        getCurrencyPrice(item.symbol).then(res => {
          let resData = res.data;
          if (resData.statusCode === 200) {
            setPrice(round(resData.value));
          } else {
            setPrice(round(item.price));
          }
        });
      }
    });
  };
  useEffect(() => {
    let interval = null;
    findCurrentCurrencyIsFavorite();
    setPrice(round(item.price))
    if (!searchFromModal) {
      if (getRealTimeData) {
        socketConnection(item.symbol);
        interval = setInterval(() => {
          getRealTimeDataFromApi();
        }, 5000);
      } else {
        getRealTimeDataFromApi();
      }
    }

    return () => {
      setPrice(0);
      if(getRealTimeData) {
        if(ws.current !== null){
          ws.current.close();
        }
      }
      if (interval !== null) {
        clearInterval(interval);
      }
    };

  }, [item]);




  const findCurrentCurrencyIsFavorite = () =>{
    favorites.some(element => {
      if (element.symbol === item.symbol) {
        setIsFavoriteCoin(true);
      }
    });
  }

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

  const socketConnection = (symbol) => {
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/" + symbol+"usdt@kline_1m");
    let wss = ws.current
    wssConnection(wss);
  };



  const addFavorite = (coin) => {
    if (isFavoriteCoin) {
      setIsFavoriteCoin(false);
      deleteCurrencyFromFavorite(coin);
    } else {
      setIsFavoriteCoin(true);
      addCurrencyToFavorite(coin);
    }

  };


  return (
    <TouchableOpacity disabled={searchFromModal} onPress={() => navigateAndAddPageHistory("CoinDetailScreen", {
      name: item.name,
      coin: item,
    }, "Watchlist")}>
      <View>
        <View style={containerStyle}>
          <View style={{ flex: 1 }}>
            <Image style={coinImage}
                   source={{ uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/" + item.id + ".png" }} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={textStyle}>
              {item.name}
            </Text>
            <Text style={textStyle}>
              {item.symbol.toUpperCase()}
            </Text>
          </View>
          {!searchFromModal && <View style={{ flex: 1 }}>
            <Text style={isUp ? upPriceStyle : downPriceStyle}>
              {price}$
            </Text>
          </View>}
          <View style={{ alignItems: "flex-end", marginLeft: 10 }}>
            <TouchableOpacity onPress={() => addFavorite({
              symbol: item.symbol,
              name: item.name,
            })}>
              <Ionicons name={isFavoriteCoin ? "md-star-sharp" : "md-star-outline"} size={30} color={"#EFB90B"} />
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
    textAlign: "right",
  },
  coinImage: {
    flex: 1, marginTop: 10, marginRight: 10, marginBottom: 10,
    justifyContent: "flex-start", height: undefined, width: undefined, resizeMode: "contain",
  },
};

export default memo(CurrencySummaryCard);

import React, { useState,useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCurrencies } from '../../reducers/CryptoApiService'

const WatchList = () => {

  const [coins, setCoins] = useState([]);

  const { containerStyle, textStyle } = styles;
  useEffect(() => {
    getCurrencies("top100").then(res => {
      let data = res.data;
      let currencies = data.map((item) => {
        console.log(item.name,item.symbol)
        return {
          name : item.name,
          symbol: item.symbol.toLowerCase(),
          price: item.quote.USD.price
        }
      })
      setCoins(currencies)
    })
  },[])

  return (
    <View style={containerStyle}>
      <Header headerText={"Takip Listesi"}></Header>
      <FlatList data={coins}
                renderItem={({ item }) =>
                  <CurrencySummaryCard item={item} />}
      />

    </View>);
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#000000",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
};

export default WatchList;


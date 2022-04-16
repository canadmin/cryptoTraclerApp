import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCurrencies } from "../../reducers/CryptoApiService";
import { insertFavorites, deleteFavorites, getAllFavorites, deleteAll } from "../../storage/allSchema";
import realm from "../../storage/allSchema";

const CurrenciesList = () => {

  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { containerStyle, textStyle } = styles;
  useEffect(() => {


    getAllFavorites().then(res => {
      if (res !== null) {
        setFavorites(res);
      }
    }).then(() => {
      getCurrencies("top10").then(res => {
        let data = res.data;
        let currencies = data.map((item) => {
          return {
            name: item.name,
            symbol: item.symbol.toLowerCase(),
            price: item.quote.USD.price,
            id:item.id
          };
        });
        setCoins(currencies);
      });
    });
  }, []);

  const addCurrencyToFavorite = (coin) => {
    insertFavorites({ symbol: coin.symbol, name: coin.name }).then((res) => {
      console.log(res);
    }).then(() => {
      getAllFavorites().then(res => {
        console.log(res);
      });
    });
  };

  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then((res => {
      console.log(res);
    }));
  };

  return (
    <View style={containerStyle}>
      <Header headerText={"Takip Listesi"}></Header>
      <FlatList data={coins}
                renderItem={({ item,index }) =>
                  <CurrencySummaryCard item={item}
                                       index={index}
                                       addCurrencyToFavorite={addCurrencyToFavorite}
                                       deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                                       favorites={favorites}
                                       getRealTimeData={false} />}
      />

    </View>);
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: '#000',
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
};

export default CurrenciesList;


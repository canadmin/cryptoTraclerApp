import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCurrencies } from "../../reducers/CryptoApiService";
import { insertFavorites, deleteFavorites, getAllFavorites, deleteAll } from "../../storage/allSchema";
import { useSelector, useDispatch } from "react-redux";
import {addWatchList,removeWatchList} from '../../redux/action'

const CurrenciesList = () => {
  const {watchedCoins} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();

  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const { containerStyle, textStyle } = styles;
  useEffect(() => {
    getAllFavorites().then(res => {
      if (res !== null) {
        setFavorites(res);
      }
    }).then(() => {
      getCurrencies("top100").then(res => {
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

    return () => {
      setFavorites([]);
      setCoins([])
    }
  }, []);

  useEffect( () => {
    console.log(watchedCoins);
    return () => {

    }
  },[watchedCoins])

  const addCurrencyToFavorite = (coin) => {
    insertFavorites({ symbol: coin.symbol, name: coin.name }).then((res) => {
    }).then(() => {
      dispatch(addWatchList(coin))
    });
  };

  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then((res => {
      dispatch(removeWatchList(coin))
    }));
  };

  return (
    <View style={containerStyle}>
      <Header headerText={"Takip Listesi"}></Header>
      <FlatList data={coins}
                initialNumToRender={5}
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


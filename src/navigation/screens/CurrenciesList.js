import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCurrencies } from "../../reducers/CryptoApiService";
import { insertFavorites, deleteFavorites, getAllFavorites, deleteAll } from "../../storage/allSchema";
import { useSelector, useDispatch } from "react-redux";
import { addPageHistory, addWatchList, removeWatchList } from "../../redux/action";

const CurrenciesList = ({navigation}) => {
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
        let currencies = data.map((item,index) => {
          return {
            ...item,
            symbol: item.symbol.toLowerCase(),
            price: item.quote.USD.price,
            key:index,
            percent_change_1h:item.quote.USD.percent_change_24h,
            percent_change_24h:item.quote.USD.percent_change_24h,
            percent_change_7d:item.quote.USD.percent_change_7d,
            percent_change_30d:item.quote.USD.percent_change_30d,
            percent_change_60d:item.quote.USD.percent_change_60d,
            percent_change_90d:item.quote.USD.percent_change_90d,
            market_cap:item.quote.USD.market_cap,
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
  const navigateAndAddPageHistory = (route,param) => {
    navigation.navigate(route,param);
    dispatch(addPageHistory("CurrenciesList"))
  }
  const renderItem = ({ item,index}) => (
    <CurrencySummaryCard item={item}
                         index={index}
                         addCurrencyToFavorite={addCurrencyToFavorite}
                         deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                         favorites={favorites}
                         navigation={navigation}
                         key={index}
                         initialNumToRender={10}
                         windowSize={5}
                         maxToRenderPerBatch={5}
                         updateCellsBatchingPeriod={30}
                         navigateAndAddPageHistory={navigateAndAddPageHistory}
                         getRealTimeData={false} />
  );

  return (
    <View style={containerStyle}>
      <Header headerText={"All Coins"} />
      <FlatList data={coins}
                initialNumToRender={5}
                renderItem={renderItem}
      />

    </View>);
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#11161D",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
};

export default CurrenciesList;


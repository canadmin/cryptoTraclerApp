import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCurrencies } from "../../reducers/CryptoApiService";
import { insertFavorites, deleteFavorites, getAllFavorites, deleteAll } from "../../storage/allSchema";
import { useSelector, useDispatch } from "react-redux";
import { addAllCoins, addPageHistory, addWatchList, removeWatchList } from "../../redux/action";
import CurrenciesFilter from "./common/CurrenciesFilter";
import AppLoader from "./common/AppLoader";

const CurrenciesList = ({navigation}) => {
  const {watchedCoins} = useSelector(state => state.userReducer)
  const dispatch = useDispatch();
  const [searchInput,onchangeSearchInput] = useState("");

  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [dataFetching,setDataFetching] = useState(false);
  const {allCoins} = useSelector(state => state.userReducer)


  const { containerStyle, textStyle } = styles;
  useEffect(() => {
    setDataFetching(true)
    getAllFavorites().then(res => {
      if (res !== null) {
        setFavorites(res);
      }
    }).then(() => {
      if(allCoins.length > 0) {
        setCoins(allCoins);
        setFiltered(allCoins)
        setDataFetching(false)
      }else {
        getCurrencies("all").then(async res => {
          let data = res.data;
          let currencies = data.map((item,index) => {
            return {
              ...item,
              symbol: item.symbol.toLowerCase(),
              price: item.quote.USD.price,
              key:index,
              percent_change_1h:item.quote.USD.percent_change_1h,
              percent_change_24h:item.quote.USD.percent_change_24h,
              percent_change_7d:item.quote.USD.percent_change_7d,
              percent_change_30d:item.quote.USD.percent_change_30d,
              percent_change_60d:item.quote.USD.percent_change_60d,
              percent_change_90d:item.quote.USD.percent_change_90d,
              market_cap:item.quote.USD.market_cap,
            };
          });
          setCoins(currencies);
          setFiltered(currencies)
          await dispatch((addAllCoins(currencies)))
          setDataFetching(false)

        }).catch(e => {});
      }

    }).catch(e => {});

    return () => {
      setFavorites([]);
      setCoins([])
      setFiltered([])

    }
  }, []);

  useEffect(() => {
    let filteredData = coins.filter(function (item) {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });

    setFiltered(filteredData);
  },[searchInput])

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
                         navigateAndAddPageHistory={navigateAndAddPageHistory}
                         getRealTimeData={false} />
  );
  const getItemLayout = (data, index) => (
    {length: 100, offset: 100 * index, index}
  );
  return (
    <View style={containerStyle}>
      <Header headerText={"All Coins"} ></Header>
      <View style={{backgroundColor:'#2C3640'}}>
        <CurrenciesFilter searchInput={searchInput} onchangeSearchInput={onchangeSearchInput}></CurrenciesFilter>
      </View>
      <FlatList data={filtered}
                initialNumToRender={10}
                windowSize={10}
                maxToRenderPerBatch={5}
                getItemLayout={getItemLayout}
                updateCellsBatchingPeriod={30}
                renderItem={renderItem}
      />
      {dataFetching && <AppLoader/>}

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


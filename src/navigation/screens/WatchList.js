import React, { useState, useEffect } from "react";
import { View, Text, FlatList,Alert,TouchableOpacity } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCryptoInfo } from "../../reducers/CryptoApiService";
import { deleteFavorites, getAllFavorites } from "../../storage/allSchema";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector, } from "react-redux";
import { addPageHistory, removeWatchList } from "../../redux/action";
import AddCoinToFavModal from '../screens/common/AddCoinToFavModal';

const WatchList = (props) => {

  const {navigation} = props;
  const dispatch = useDispatch();
  const watchedCoins = useSelector((state) =>state.userReducer.watchedCoins);

  const { containerStyle, textStyle, addWatchListButton } = styles;
  const [coins, setCoins] = useState(watchedCoins);
  const [favorites, setFavorites] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [refresh,setRefresh] = useState(false);

  useEffect(() => {
    createWatchlist()
  }, [watchedCoins]);

  useEffect(() => {
    return () => {
      setFavorites([]);
      setCoins([]);
    };
  }, []);

  const onRefresh = () => {

    setRefresh(true);
  }

  const createWatchlist = () => {
    let favorites = "";
    getAllFavorites().then(res => {
      setFavorites(res);
      if (res !== undefined) {
        res.forEach(item => {
          favorites += item.symbol + ",";
        });
      }
    }).then(() => {
      getCryptoInfo(favorites)
        .then((res) => {
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
          setRefresh(false)
          setCoins(currencies);
        })
    });
  }

  const deleteCurrencyFromFavorite = (coin) => {
    const filteredData = coins.filter(item => item.symbol !== coin.symbol);
    setCoins(filteredData)
    deleteFavorites(coin.symbol).then(() => {
      dispatch(removeWatchList(coin))
    });
  };


  const navigateAndAddPageHistory = (route,param) => {
    navigation.navigate(route,param);
    dispatch(addPageHistory("WatchList"))
  }



  return (
    <View style={containerStyle}>
      <Header headerText={"Watch List"} />
      {coins.length > 0 && favorites.length > 0 &&
      <FlatList data={coins}
                initialNumToRender={5}
                onRefresh={() => onRefresh()}
                refreshing={refresh}

                renderItem={({ item, index }) => {

                    return <CurrencySummaryCard item={item}
                                                index={index}
                                                favorites={favorites}
                                                initialNumToRender={10}
                                                windowSize={5}
                                                keyExtractor={item => item.id}
                                                maxToRenderPerBatch={5}
                                                updateCellsBatchingPeriod={30}
                                                deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                                                navigation={navigation}
                                                navigateAndAddPageHistory={navigateAndAddPageHistory}
                                                getRealTimeData={true} />;
                  }

                }
      />}
      {showModal && <AddCoinToFavModal setShowModal={setShowModal} showModal={showModal}/>}
      <TouchableOpacity onPress={() => setShowModal(true)}>
        <View style={addWatchListButton}>
          <Ionicons name={"add-sharp"} size={30} color={'#EFB90B'} />
          <Text style={{ color: "white" }}>
            Add coins to Watchlist
          </Text>
        </View>
      </TouchableOpacity>
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
  addWatchListButton:{
    height: 50,
    flexDirection:'row',
    backgroundColor: '#1C2834',
    marginTop:10,
    marginLeft:50,
    marginRight: 50,
    justifyContent:'center',
    alignItems:'center'
  }
};




export default WatchList;



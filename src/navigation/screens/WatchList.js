import React, { useState, useEffect } from "react";
import { View, Text, ScrollView,Alert,TouchableOpacity } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCryptoInfo } from "../../reducers/CryptoApiService";
import { deleteFavorites, getAllFavorites } from "../../storage/allSchema";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector, } from "react-redux";
import { addPageHistory, removeWatchList } from "../../redux/action";
import AddCoinToFavModal from '../screens/common/AddCoinToFavModal';
import AppLoader from "./common/AppLoader";
import TextTicker from 'react-native-text-ticker'

const WatchList = (props) => {

  const {navigation} = props;
  const dispatch = useDispatch();
  const watchedCoins = useSelector((state) =>state.userReducer.watchedCoins);

  const { containerStyle, textStyle, addWatchListButton } = styles;
  const [coins, setCoins] = useState(watchedCoins);
  const [favorites, setFavorites] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [refresh,setRefresh] = useState(false);
  const [dataFetching,setDataFetching] = useState(false);

  useEffect(() => {
    createWatchlist()
    return () => {
      setFavorites([]);
      setCoins([]);
    };
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
    setDataFetching(true)
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
              percent_change_1h:item.quote.USD.percent_change_1h,
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
          setDataFetching(false)
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
    <ScrollView style={{flex:1,backgroundColor:"#11161D"}}>
      <Header headerText={"Watch List"} />
      <TextTicker
        style={{ fontSize: 24,color:'white' }}
        duration={7000}
        loop
        scrollSpeed={10000}
        marqueeDelay={1000}
      >
        Super long piece of text is long. The quick brown fox jumps over the lazy dog.
      </TextTicker>
      <ScrollView style={containerStyle}>
      {coins.length > 0 && favorites.length > 0 &&
        coins.map((item,index) => (
          <CurrencySummaryCard item={item}
                               index={index}
                               favorites={favorites}
                               keyExtractor={item => item.id}
                               deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                               navigation={navigation}
                               navigateAndAddPageHistory={navigateAndAddPageHistory}
                               getRealTimeData={true} />
        ))
      }
      {showModal && <AddCoinToFavModal setShowModal={setShowModal} showModal={showModal}/>}
    </ScrollView>
      <View style={{  borderBottomColor:"#9a9a9a",
        borderBottomWidth:1,marginTop:20,width:"95%",alignSelf:'center'}}></View>
        {dataFetching && <AppLoader/>}
      <TouchableOpacity style={{marginTop:30}} onPress={() => setShowModal(true)}>
        <View style={addWatchListButton}>
          <Ionicons name={"add-sharp"} size={30} color={'#EFB90B'} />
          <Text style={{ color: "white" }}>
            Add coins to Watchlist
          </Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  containerStyle: {
    backgroundColor: "#11161D",
    marginTop:20
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
  addWatchListButton:{
    height: 50,
    flexDirection:'row',
    backgroundColor: '#1C2834',
    marginLeft:50,
    marginRight: 50,
    marginBottom: 50,
    justifyContent:'center',
    alignItems:'center'
  }
};




export default WatchList;



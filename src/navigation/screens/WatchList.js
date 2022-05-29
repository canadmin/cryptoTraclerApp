import React, { useState, useEffect } from "react";
import { View, Text, ScrollView,Alert,TouchableOpacity,Image } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCryptoInfo, getMarketGlobalData, getMarketPrice, getMarketTrending } from "../../reducers/CryptoApiService";
import { deleteFavorites, getAllFavorites } from "../../storage/allSchema";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector, } from "react-redux";
import { addPageHistory, removeWatchList } from "../../redux/action";
import AddCoinToFavModal from '../screens/common/AddCoinToFavModal';
import AppLoader from "./common/AppLoader";
import TextTicker from 'react-native-text-ticker'
import { floorCalc, round } from "../../helper/Utils";
import AssetSummaryCard from "./common/AssetSummaryCard";

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
  const [global,setGlobal] = useState(null);
  const [trending,setTrending] = useState(null);
  const [trendingPrice,setTrendingPrice] = useState([]);

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
      setGlobal(null);
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
          getMarketGlobalData().then((res) => {
            setGlobal(res.data.data);
            setDataFetching(false)
          })
        })
    });
  }

  useEffect(() => {
    let trending = "";
    getMarketTrending().then((res) => {
      if(res.data.coins){
        res.data.coins.forEach((item,idx) => {
          trending += item.item.id+","
        });
        getMarketPrice(trending).then((res2) => {
          setTrendingPrice(res2.data)
          setTrending(res.data.coins)
        })
      }

    })
  },[])
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
  };

  const createPercentage = (items) => {
    let str = " ";
    Object.keys(items).forEach(item => {
      str += item.toUpperCase() + "= " + round(items[item]) + "% ✫ ";
    });
    return str;
  }

  return (
    <ScrollView style={{flex:1,backgroundColor:"#11161D"}}>
      <Header headerText={"Watch List"} />
      {global &&
      <View style={{backgroundColor:'#EFB90B',marginTop:5}}>
      <TextTicker
        style={{ fontSize: 22,color:'11161D',fontWeight:'bold',marginTop:5}}
        duration={10000}
        loop
        scrollSpeed={100200}
        marqueeDelay={1000}
      >
        {`Total Market Cap : $`+floorCalc(global.total_market_cap.usd) + ` | Market Cap Percentage :`+createPercentage(global.market_cap_percentage)}
      </TextTicker>
      </View>}
      <ScrollView style={containerStyle}>
      {coins.length > 0 && favorites.length > 0 &&
        coins.map((item,index) => (
          <CurrencySummaryCard item={item}
                               index={index}
                               favorites={favorites}
                               isWatchList={true}
                               key={`asset +${index*2}`}
                               keyExtractor={item => item.id}
                               deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                               navigation={navigation}
                               navigateAndAddPageHistory={navigateAndAddPageHistory}
                               getRealTimeData={true} />
        ))
      }


      {showModal && <AddCoinToFavModal setShowModal={setShowModal} showModal={showModal}/>}
    </ScrollView>

      <View>
        <Text style={{color:'white',fontSize:20,marginTop:10,fontWeight:'bold',marginLeft:10}}>Search Trending</Text>
      </View>
      <ScrollView horizontal>
        {trending && trendingPrice && trending.map((item,index) => (
          <View style={{backgroundColor:"#2C3640" ,margin:10 ,width:100,height:100,borderRadius:10}}>
            <View style={{padding:10,flexDirection:'row'}}>
              <View>
              <Image style={styles.coinImage}
                     source={{ uri: item.item.large}} />
            </View>
            <View style={{position:"absolute",right:5,top:10}}>
              <Text style={{fontSize:14,fontWeight:'bold',color:'white'}}>{item.item.score + 1}</Text>
            </View>
            </View>

            <View style={{marginLeft:10}}>
              <Text style={{color:'white',fontWeight:'bold',alignSelf:'center'}}>{item.item.symbol}</Text>
            </View>
            <View style={{position:"absolute",bottom:5,alignSelf:'center'}}>
              <Text style={{fontSize:14,color:"#D5FA50"}}>{round(trendingPrice[item.item.id].usd)}</Text>
            </View>

          </View>
        ))}

      </ScrollView>
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
  },
  coinImage: {
     marginRight: 0, marginBottom: 0,
    justifyContent: "center", height: 30, width: 30, resizeMode: "contain",
  },
};




export default WatchList;



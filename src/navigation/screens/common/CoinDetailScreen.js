import React, { useEffect, useRef, useState,useCallback } from "react";
import {View,Text,Image,TouchableOpacity,Alert,ScrollView} from 'react-native';
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addPageHistory } from "../../../redux/action";
import TimePeriod from "./TimePeriod";
import LineChart from "./LineChart";
import Ionicons from "react-native-vector-icons/Ionicons";
import { round, floorCalc, negativeRound, getCoinGeckoId, priceFormat } from "../../../helper/Utils";
import { getCurrenciesFromExtarnalApi, getCurrencyPrice,getChartValue } from "../../../reducers/CryptoApiService";
import AddToPortfolioModal from '../../screens/common/AddToPortfolioModal';
import AppLoader from "./AppLoader";

const CoinDetailScreen = ({navigation,route}) => {
  const coin = route.params.coin;
  const isFavoriteCoin = route.params.isFavoriteCoin;

  const ws = useRef(null);

  const dispatch = useDispatch();
  const {pageHistory} = useSelector(state => state.userReducer)
  const {coinImage,coinPriceAndLogoView,textStyle,addToPortfolioButton} = styles;
  //state
  const [price,setPrice] = useState(coin.price)
  const [isUp, setIsUp] = useState(true);
  const [showModal,setShowModal] = useState(false);
  const [showLineChart,setShowLineChart] = useState(false);
  const [dataFetching,setDataFetching] = useState(false);

  const [period,setPeriod] = useState();

  const [coinData,setCoinData] = useState([])
  const forceUpdate = useCallback(() => setCoinData([]), []);

  const handleHeaderBackOnPress = () => {
    //burada bağlı olan soketleri kapatacağız.
    navigation.navigate(pageHistory)
  }


  const modifyStyle = (value) => {
    if(value < 0){
      return { ...styles.tableValue,color:'red' }
    }
    return styles.tableValue;
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

  const getRealTimeDataFromApi = () => {
    getCurrenciesFromExtarnalApi(coin.symbol).then(response => {
      let externalData = response.data;
      if (externalData.last && externalData.last > 0) {
        setPrice(round(externalData.last));
      } else {
        getCurrencyPrice(coin.symbol).then(res => {
          let resData = res.data;
          if (resData.statusCode === 200) {
            setPrice(round(resData.value));
          } else {
            setPrice(round(item.price));
          }
        }).catch(e => {});
      }
    }).catch(e => {});
  };

  useEffect(() =>{
    let data = []
    setDataFetching(true)
    getChartValue(getCoinGeckoId(coin.symbol),period).then((res) => {
      if(res.data && res.data.length > 0){
        res.data.forEach(item => {
          let tempOBj = {
            time : item[0],
            value: item[2],
          }
          data.push(tempOBj);
        })
      }
      setCoinData(data);
      setDataFetching(false)
      return () => {
        setPrice(null);
      }
    }).catch(e => {})
  },[period])
  useEffect(() => {
    ws.current = new WebSocket("wss://stream.binance.com:9443/ws/" + coin.symbol + "usdt@kline_1m");
    const wss = ws.current;
    wssConnection(wss);

    getRealTimeDataFromApi();
    let interval = null;
      interval = setInterval(() => {
        getRealTimeDataFromApi();
      }, 15000);

    return () => {
      //wss.close();
      clearInterval(interval);
      setPrice(null)
      setIsUp(null)
    }
  },[]);


  return (
    <ScrollView style={{flex:1,backgroundColor:'#11161D'}}>
      <Header headerText={route.params.name} isDetailScreen={true}
              coin={coin}
              isFavoriteCoin={isFavoriteCoin} handleHeaderBackOnPress={handleHeaderBackOnPress}></Header>
      <TouchableOpacity onPress={() => {console.log("aaaaa")}} style={{position:"absolute",right:20,top:40,zIndex:10}}>
        <View>
          <Ionicons name={"ios-calculator-outline"} size={40} color={'#EFB90B'}></Ionicons>
        </View>
      </TouchableOpacity>
      <View style={{alignItems:'center'}}>
        <Text style={textStyle}>
          {priceFormat(price)}
        </Text>
      </View>
      <LineChart
        line_chart_data={coinData}
        circleColor={"#70A800"}
        axisColor={"#9dd"}
        axisLabelFontSize={9}
        showGradient={true}
        containerHeight={300}
        lineChartColor={'#70A800'}
        renderCircleAndRect={false}
        key={coinData.length < 1 ? 222 : coinData[0].time}
        setPeriod={setPeriod}
      />
      <TimePeriod setPeriod={setPeriod}/>

      < TouchableOpacity onPress={() => setShowModal(true)} style={addToPortfolioButton}>
          <Ionicons name={"add-sharp"} size={30} color={'#EFB90B'} />
          <Text style={{ color: "white" }}>
            Add Transaction
          </Text>
        </TouchableOpacity>
      <View style={{marginTop:50,marginRight:30,marginLeft:45}}>
        <View>
          <Text style={styles.priceStyle}>Overview</Text>
          <View
            style={{
              borderWidth: 0.4,
              opacity: 0.4,
              borderColor: "white",
              marginLeft: 0,
              marginRight: 25,
              marginTop:15
            }}
          />
        </View>
        <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Rank</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={styles.tableValue}>#{coin.cmc_rank}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

         <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Price</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={styles.tableValue}>${priceFormat(coin.price)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

        <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Chg(1h)</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={modifyStyle(coin.percent_change_1h)}>
                {negativeRound(coin.percent_change_1h)}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

         <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Chg(24h)</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={modifyStyle(coin.percent_change_24h)}>
                {negativeRound(coin.percent_change_24h)}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

         <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Chg(7d)</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={modifyStyle(coin.percent_change_7d)}>{negativeRound(coin.percent_change_7d)}%</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

        <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>M/Cap</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={styles.tableValue}>{floorCalc(round(coin.market_cap))}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

        <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Max Supply</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={styles.tableValue}>{floorCalc(coin.max_supply)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

        <View style={styles.detailTable}>
          <View style={styles.overViewRow}>
            <View style={{justifyContent:'flex-start',flex:4}}>
              <Text style={styles.tableHeader}>Circulating</Text>
            </View>
            <View style={{alignContent:'flex-end',flex:3}}>
              <Text style={styles.tableValue}>{floorCalc(coin.circulating_supply)}</Text>
            </View>
          </View>
        </View>
        <View style={styles.parser}/>

      </View>

      {showModal && <AddToPortfolioModal coin={coin} setShowModal={setShowModal} showModal={showModal}
                                         navigation={navigation}
                                         showCoinSearch={true}
                                         headerText={"Create Transaction"}/>}
      {dataFetching && <AppLoader/>}

    </ScrollView>)
};

const styles = {
  coinImage : {
    flex: 1, marginTop:10, marginRight:10, marginBottom: 10,
    justifyContent:'flex-start',height: undefined, width: undefined, resizeMode: 'contain'
  },
  coinPriceAndLogoView: {
    flexDirection:'row',
    height: 70,
    //alignItems: flex-end , center, flex-start
    alignItems: "center",
    marginLeft:20,
    marginRight:30,

  },
  textStyle:{
    color:'#70A800',
    fontSize:34,
    marginLeft: 20,
    marginTop: 20,
    alignItems: "center",
    flex:2

  },
  changePercentAreaUp:{
    backgroundColor:'#70A800',
    color:'#ffffff',
    alignSelf:'flex-end',
    justifyContent:'center',
    marginRight:50,
    padding:10,
    borderRadius:5
  },

  priceStyle: {
    color:'white',
    fontSize: 24,
    fontWeight:'bold'
  },
  addToPortfolioButton:{
    height: 50,
    flexDirection:'row',
    backgroundColor: '#1C2834',
    marginTop:40,
    marginLeft:50,
    marginRight: 50,
    justifyContent:'center',
    alignItems:'center'
  },

  overViewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  tableHeader: {
    color:'#AAAAAA',
    fontSize:16,
    fontWeight: 'bold'

  },
  tableValue : {
    fontSize:11,
    color:'white',
    marginLeft: 15,
    fontWeight:'bold'

  },
  detailTable: {
    marginTop:10
  },
  parserArea: {
    marginTop:10
  },
  parser : {
    borderWidth: 0.5,
    opacity: 0.4,
    borderColor: "white",
    marginTop:10,
    marginRight:25
  }

};

export default CoinDetailScreen;

import React,{useEffect,useState} from "react";
import {View,Text,Image,TouchableOpacity,Alert,ScrollView} from 'react-native';
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import { addPageHistory } from "../../../redux/action";
import LineChart from "./LineChart";
import Ionicons from "react-native-vector-icons/Ionicons";
import {round,floorCalc,negativeRound} from "../../../helper/Utils";
import { getCurrenciesFromExtarnalApi } from "../../../reducers/CryptoApiService";

const CoinDetailScreen = ({navigation,route}) => {
  const coin = route.params.coin;


  const dispatch = useDispatch();
  const {pageHistory} = useSelector(state => state.userReducer)
  const {coinImage,coinPriceAndLogoView,textStyle,addToPortfolioButton} = styles;

  //state
  const [price,setPrice] = useState(coin.price)
  const [isUp, setIsUp] = useState(true);

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
  useEffect(() => {

    let wss = new WebSocket("wss://stream.binance.com:9443/ws/" + coin.symbol + "usdt@kline_1m");
    wssConnection(wss);

    let interval = null;
      interval = setInterval(() => {
        getCurrenciesFromExtarnalApi(coin.symbol).then(response => {
          let externalData = response.data;
          if(externalData.last && externalData.last > 0 ){
            setPrice(round(externalData.last))
          }
        });
      }, 5000);

    return () => {
      // clear func

      wss.close();
      clearInterval(interval);
      setPrice(null)
    }
  },[])
  return (
    <ScrollView style={{flex:1,backgroundColor:'#11161D'}}>
      <Header headerText={route.params.name} isDetailScreen={true}  handleHeaderBackOnPress={handleHeaderBackOnPress}></Header>
      <View style={{flexDirection:'row'}}>
        <Text style={textStyle}>
          $ {round(price)}
        </Text>
      </View>
      <LineChart
        line_chart_data={[{time:'11 Feb', value:3422},
          {time:'12 Feb', value:3035.17},
          {time:'14 Feb', value:3033.27},
          {time:'15 Feb', value:2399.27},
          {time:'16 Feb', value:3033.27},
          {time:'17 Feb', value:933.27},
          {time:'18 Feb', value:2222.27},
        ]}
        circleColor={"#70A800"}
        axisColor={"#9dd"}
        axisLabelFontSize={9}
        showGradient={false}
        containerHeight={300}
        lineChartColor={'#70A800'}
        renderCircleAndRect={false}
      />
      <TouchableOpacity onPress={() => Alert.alert(`Portfolio ekleme modalı açılacak`)}>
        <View style={addToPortfolioButton}>
          <Ionicons name={"add-sharp"} size={30} color={'#EFB90B'} />
          <Text style={{ color: "white" }}>
            Add To Portfolio
          </Text>
        </View>
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
              <Text style={styles.tableValue}>${round(coin.price)}</Text>
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
  changePercentAreaUp:{backgroundColor:'#70A800',
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
    fontSize:16,
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
    borderWidth: 0.4,
    opacity: 0.4,
    borderColor: "white",
    marginTop:10,
    marginRight:25
  }

};

export default CoinDetailScreen;

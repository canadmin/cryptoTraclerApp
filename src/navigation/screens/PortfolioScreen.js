import React, { useEffect, useRef, useState } from "react";
import {View, Text,TouchableOpacity ,ScrollView} from 'react-native';
import Header from "./common/Header";
import { getAllPortfolio, getAssetsByPortfolio } from "../../storage/allSchema";
import AssetSummaryCard from "./common/AssetSummaryCard";
import PieChart from "./common/PieChart";
import { getRandomColor, priceFormat, round } from "../../helper/Utils";
import { getCurrenciesFromExtarnalApi, getCurrencyPrice, getPortfolioPrices } from "../../reducers/CryptoApiService";
import ActionSheetCustom from "react-native-actionsheet/lib/ActionSheetCustom";
import { hairlineWidth } from "react-native-actionsheet/lib/styles";
import AppLoader from "./common/AppLoader";
import AddToPortfolioModal from "./common/AddToPortfolioModal";
import { addPageHistory } from "../../redux/action";
import { useDispatch } from "react-redux";
const PortfolioScreen = (props) => {

  const {navigation} = props;
  const dispatch = useDispatch();
  const actionSheet = useRef();

  const [showModal,setShowModal] = useState(false);
  const {containerStyle,portfolioHeader,component1,totalValue} = styles;
  const [currentPortfolio,setCurrentPortfolio] = useState(null);
  const [assets,setAssets] = useState([])
  const [tempAssets,setTempAssets] = useState([])
  const [currentTotalValue,setCurrentTotalValue] = useState(0);
  const [showPopUp,setShowPopUp] = useState(false);
  const [dataFetching,setDataFetching] = useState(false);
  const [bottomSelectCoin,setBottomSelectCoin] = useState();

  let optionArray = [
    'Asset', 'Portfolio','Close'
  ]

  const showActionSheet = () => {
      actionSheet.current.show();
  }

  const selectCoinFromBottom = (name) => {
   setBottomSelectCoin(name);
  }

  const navigateAndAddPageHistory = (route,param) => {
    navigation.navigate(route,param);
    dispatch(addPageHistory("PortfolioScreen"))
  }

  useEffect(() => {
    setDataFetching(true)
    let portfolioId = 1;
      getAllPortfolio().then(res => {
      setCurrentPortfolio(res);
        getAssetsByPortfolio(portfolioId).then(res => {
          let uniqueArray = [];
          res.forEach((item,index) => {
            if(!uniqueArray.includes(item.symbol)){
              uniqueArray.push(item.symbol)
            }
          });
          getPortfolioPrices(uniqueArray).then(prices => { // fiyatları aldık
            prices.data.forEach(async (item,index)=> { //btc
                  let currentCoin = res.filter(elem => elem.symbol.includes(item.symbol.toLowerCase()))[0];
                  let totalMoneySpent = 0;
                  let totalAmount = 0;
                  let changePercentage = 0;
                  let uniqueSymbol = res.filter(elem => elem.symbol.includes(item.symbol.toLowerCase()))
                  await uniqueSymbol.forEach((it,idx) => {
                    totalMoneySpent += Number(it.amount) * it.price;
                    totalAmount += Number(it.amount);
                  });
                  changePercentage = (((totalAmount * item.value) / totalMoneySpent) - 1 ) * 100;

                  if(totalAmount>1){
                    const newData =  {
                      portfolioId: currentCoin.portfolioId,
                      id:currentCoin.id,
                      amount: totalAmount,
                      price: item.value,
                      isAddTransaction: currentCoin.isAddTransaction,
                      symbol: currentCoin.symbol,
                      name: currentCoin.name,
                      coinId: currentCoin.coinId,
                      assetColor: getRandomColor(),
                      changePercentage:changePercentage,
                    };
                    setAssets(prevArray => [...prevArray, newData])
                  }
            });
          }).then(()=> {
            setDataFetching(false)
          });
        })
    })

    return() => {
        setAssets([]);
        setCurrentTotalValue(0)
    }
  },[]);

  useEffect(() => {
    calculateTotalValue(assets)
  },[assets]);



  const calculateTotalValue = (res) => {
    let sum = 0;
    assets.forEach(item => {
      sum+= item.price*item.amount;
    })
    return sum;
  }
  return (
<>
    <ScrollView style={containerStyle}>
      <Header headerText={"My Portfolio"} isPortfolioScreen={true} showActionSheet={showActionSheet}/>
      <View style={{alignItems:'flex-start',marginTop:20,marginLeft:10}}>
        <Text style={{color:'white',fontSize:19,fontWeight:"bold"}}>
          Current Balance
        </Text>
        <Text style={{marginTop: 5, color:"#FFF", fontSize:36, fontWeight:'bold',fontFamily:'Feather'}}>
          {priceFormat(calculateTotalValue(assets))}</Text>
        <Text style={{marginTop: 5, color:"#70A800",fontSize:22, fontWeight:'bold',fontFamily:'Feather'}}>Change: 8.33% </Text>
      </View>
      {assets.length > 0 &&
        <>
          <PieChart assets={assets}  totalValue={calculateTotalValue(assets)} bottomSelectCoin={bottomSelectCoin}/>
          <ScrollView horizontal style={{flexDirection:'row',height:50,marginTop :20,alignSelf:'center'}}>
            {assets.length > 0 && assets.map((item,index) => (
              <TouchableOpacity onPress={() => setBottomSelectCoin(item.name)} style={{justifyContent:'center',flexDirection:'row'}}>
                <View style={{justifyContent:'center',marginLeft:10}}>
                  <View style={{width:10,height:10,backgroundColor:`${item.assetColor}`,borderRadius:100}}></View>
                </View>
                <View style={{marginLeft:5,justifyContent:'center'}}>
                  <Text style={{color:`${item.assetColor}`}}>{item.symbol.toUpperCase()}</Text>
                </View>
              </TouchableOpacity>
            ))}

          </ScrollView>
          <View style={styles.filter}>
            <View style={styles.topRow}>
              <View style={{flex:2}}>
              </View>
              <View style={{flex:3}}>
              </View>
              <View style={{flex:5}}>
                <Text style={{color:'#9a9a9a',alignSelf:'flex-end',fontSize:15,fontWeight:'bold',marginRight:5}}>Price</Text>
              </View>
              <View style={{flex:6}}>
                <Text style={{color:'#9a9a9a',alignSelf:'flex-end',fontSize:15,fontWeight:'bold',marginRight:15}}>Total</Text>
              </View>
            </View>

          </View>
          {assets.length > 0 && assets.map((item,index) => (
            <AssetSummaryCard item={item}
                              index={index}
                              initialNumToRender={10}
                              windowSize={5}
                              key={`asset +${index}`}
                              keyExtractor={item => item.id}
                              navigation={navigation}
                              maxToRenderPerBatch={5}
                              updateCellsBatchingPeriod={30}
                              navigateAndAddPageHistory={navigateAndAddPageHistory}
                              getRealTimeData={true} />
          ))
          }
        </>
      }

      <ActionSheetCustom
        ref={actionSheet}
        title={'Add New'}
        options={optionArray}
        cancelButtonIndex={2}
        styles={actionStyles}
        useNativeDriver={true}
        onPress={(index => {
              if(index === 0){
                  setShowModal(true)
              }
        })}/>

    </ScrollView>
  {showModal && <AddToPortfolioModal setShowModal={setShowModal} showModal={showModal}
                                     showCoinSearch={true} />}
  {dataFetching && <AppLoader/>}
</>)
};
//trending-up-sharp
const styles = {
  containerStyle : {
    backgroundColor: "#11161D",
  },
  portfolioHeader:{
    fontSize:24,
  },
  totalValue:{
    fontSize: 35,
    justifyContent: 'flex-start',
  },
  assetCardStyle: {
    marginTop :30,
    alignSelf :'center'
  },
  filter: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 20,
    marginBottom:-15,
    borderRadius: 5,
    height:20
  },
  topRow:{
    marginLeft: 5,
    flexDirection:'row',
  },
}
const actionStyles = {
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0.4,
    backgroundColor: '#000'
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row'
  },
  body: {
    flex: 1,
    alignSelf: 'flex-end',
    backgroundColor: '#e5e5e5'
  },
  titleBox: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    display:'none'
  },
  titleText: {
    color: '#757575',
    fontSize: 14
  },
  messageBox: {
    height: 30,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  messageText: {
    color: '#9a9a9a',
    fontSize: 12
  },
  buttonBox: {
    height: 50,
    marginTop: hairlineWidth,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  buttonText: {
    fontSize: 18
  },
  cancelButtonBox: {
    height: 50,
    marginTop: -25,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  }

}
//#041C32
//#04293A
//#ECB365
//#064663
//#141E27

export default PortfolioScreen;


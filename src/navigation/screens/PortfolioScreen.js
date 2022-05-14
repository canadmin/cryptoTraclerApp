import React, { useEffect, useRef, useState } from "react";
import {View, Text,FlatList ,ScrollView} from 'react-native';
import Header from "./common/Header";
import { getAllPortfolio, getAssetsByPortfolio } from "../../storage/allSchema";
import AssetSummaryCard from "./common/AssetSummaryCard";
import PieChart from "./common/PieChart";
import { getRandomColor, priceFormat, round } from "../../helper/Utils";
import { getCurrenciesFromExtarnalApi, getCurrencyPrice } from "../../reducers/CryptoApiService";
import ActionSheetCustom from "react-native-actionsheet/lib/ActionSheetCustom";
import { hairlineWidth } from "react-native-actionsheet/lib/styles";
import AppLoader from "./common/AppLoader";
import AddToPortfolioModal from "./common/AddToPortfolioModal";
const PortfolioScreen = () => {
  const actionSheet = useRef();

  const [showModal,setShowModal] = useState(false);
  const {containerStyle,portfolioHeader,component1,totalValue} = styles;
  const [currentPortfolio,setCurrentPortfolio] = useState(null);
  const [assets,setAssets] = useState([])
  const [tempAssets,setTempAssets] = useState([])
  const [currentTotalValue,setCurrentTotalValue] = useState(0);
  const [showPopUp,setShowPopUp] = useState(false);
  const [dataFetching,setDataFetching] = useState(false);


  let optionArray = [
    'Asset', 'Portfolio','Close'
  ]

  const showActionSheet = () => {
      actionSheet.current.show();
  }

  useEffect(() => {
    setDataFetching(true)
    let tempAssets = [];
    let portfolioId = 1;
      getAllPortfolio().then(res => {
      setCurrentPortfolio(res);
        getAssetsByPortfolio(portfolioId).then(res => {
          let tempList = [];
          res.forEach( async (item,index) => {
            let ss = await getCurrentPrice(item)
            const newData =  {
              portfolioId: item.portfolioId,
              id:item.id,
              amount: item.amount,
              oldPrice: item.price,
              price: String(ss),
              isAddTransaction: item.isAddTransaction,
              createDate: item.createDate,
              transactionDate: item.transactionDate,
              symbol: item.symbol,
              name: item.name,
              coinId: item.coinId,
              assetColor: item.assetColor
            };
            await tempList.push(newData);
            setAssets(prevArray => [...prevArray, newData])
            setDataFetching(false)
          })
        })
    })

    return() => {
        setAssets([]);
        setCurrentTotalValue(0)
    }
  },[]);



  const getCurrentPrice = async (item) => {
    let price = 0;
     await getCurrenciesFromExtarnalApi(item.symbol).then(async response => {
      let externalData = response.data;
      if (externalData.last && externalData.last > 0) {
        price = externalData.last;
      } else {
       await getCurrencyPrice(item.symbol).then(res => {
          let resData = res.data;
          if (resData.statusCode === 200) {
            price = resData.value;
          } else {
            price = item.price;
          }
        });
      }
    })

    return price;

  };
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
      <View style={{alignItems:'center',marginTop:20}}>
        <Text style={{marginTop: 5, color:"#70A800", fontSize:43, fontWeight:'bold',fontFamily:'Feather'}}>
          {priceFormat(calculateTotalValue(assets))}</Text>
        <Text style={{marginTop: 5, color:"#70A800",fontSize:22, fontWeight:'bold',fontFamily:'Feather'}}>Change: 8.33% </Text>
      </View>
      {assets.length > 0 &&
        <>
          <PieChart assets={assets} totalValue={calculateTotalValue(assets)}/>
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
                              maxToRenderPerBatch={5}
                              updateCellsBatchingPeriod={30}
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
    marginTop: 60,
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


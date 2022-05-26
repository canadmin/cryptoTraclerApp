import React, { useEffect, useState,useRef } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, Modal, Image, TextInput } from "react-native";
import Header from "./Header";
import DatePicker from "react-native-date-picker";
import Moment from "moment";
import {
  addAssetToPortfolio,
  getAllFavorites,
  getAllPortfolio,
  getAssetsByPortfolio,
} from "../../../storage/allSchema";
import { getCoinGeckoId, getRandomColor, priceFormat, round, validatePriceAndAmount } from "../../../helper/Utils";
import { getCurrencies, getHistoryPrice } from "../../../reducers/CryptoApiService";
import DropdownAlert from 'react-native-dropdownalert';
import AppLoader from "./AppLoader";
import CustomSearch from "./CustomSearch";
import { useDispatch, useSelector } from "react-redux";
import { addAllCoins } from "../../../redux/action";

const AddToPortfolioModal = (props) => {
  const { showModal, setShowModal, coin=null, isUpdate=true,showCoinSearch } = props;
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(null);
  let dropDownAlertRef = useRef();
  const [coins, setCoins] = useState([]);
  const [data, setData] = useState([]);
  const [dataFetching,setDataFetching] = useState(false);
  const [selectedCoin,setSelectedCoin] = useState(coin);

  const {allCoins} = useSelector(state => state.userReducer)


  // data
  const [textDate, setTextDate] = useState(Moment(new Date()).format("DD-MM-yyyy"));
  const [amount, setAmount] = useState(1);
  const [coinPrice, setCoinPrice] = useState(selectedCoin !== null ? selectedCoin.price : 0);


  //ekleme sayfasındaki validatorler bunlar
  const [amountError,setAmountError] =useState(true);
  const [priceError,setPriceError] =useState(true);


  useEffect(() => {
    query !== null && query.length > 0 ? setData(coins.filter(elem => elem.name.includes(query))) :
      setData(coins.filter(elem => elem.name.includes("?")));
  },[query])

  useEffect(() => {
    setDataFetching(true);
    if(allCoins.length === 0 && showCoinSearch){
      getCurrencies("all").then(async res => {
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
        setData(currencies)
        await dispatch((addAllCoins(currencies)))
        setDataFetching(false)
      }).catch(e => {});
    }else{
      setCoins(allCoins);
      setData(allCoins)
      setDataFetching(false)
    }

    return () => {
      setCoins([])
      setData([])
    }
  }, []);

  const getDateFormat = () => {
    Moment.locale("en");
    return date.toISOString();
  };


  useEffect(() => {
    if(selectedCoin !== null){
      setDataFetching(true)
      getHistoryPrice(getCoinGeckoId(selectedCoin.symbol),textDate).then((res => {
        setCoinPrice(res.data.market_data ? res.data.market_data.current_price.usd : selectedCoin.price)
        setDataFetching(false)
      })).catch(e => {})
    }
  },[textDate])

  useEffect(() => {
    selectedCoin !== null ?
      setCoinPrice(selectedCoin.price): setCoinPrice(0);
  },[selectedCoin])

  const addAsset = async () => {
      let portfolioId = 0;
      await getAllPortfolio().then(res => {
        portfolioId = res[0].id;
      }).catch(e => {});

      await addAssetToPortfolio({
        portfolioId: portfolioId,
        amount: amount.toString(),
        price: coinPrice.toString(),
        isAddTransaction: true,
        createDate: new Date(),
        transactionDate: date,
        symbol: selectedCoin.symbol,
        name: selectedCoin.name,
        coinId: selectedCoin.id,
        assetColor: getRandomColor()
      }).then((res) => {
        dropDownAlertRef.alertWithType('success', 'Transaction Successful',
          `Successfully Added ${selectedCoin.name.toLowerCase()} To Your Portfolio`,null,1000)
      }).catch(e => {});
  };


  const onChangePrice = (e) => {
    setCoinPrice(e);
  }
  const onChangeAmount = (e) => {
    setAmount(e);
  }
  const onChangeDate = (date) => {
    setOpen(false);
    setDate(date);
    setTextDate(Moment(date).format("DD-MM-yyyy"));
  };
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={showModal}
      onRequestClose={() => {
      }}>
      <SafeAreaView style={styles.safeAreaStyle}>
        <Header isModal={true} headerText={"Add to Portfolio"} setShowModal={setShowModal}> </Header>
        <View style={styles.modal}>
          {showCoinSearch && <CustomSearch
            setDataFetching={setDataFetching}
            setSelectedCoin={setSelectedCoin}
              data={coins}
          />}
          {selectedCoin !== null &&  <View style={{flexDirection:"row",marginTop:50}}>
            <Image style={styles.coinImage}
            source={{ uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/" + selectedCoin.id + ".png" }} />

            <Text style={styles.symbolStyle}>{selectedCoin.symbol.toUpperCase()}</Text>
            </View>}


          <Text style={styles.convertDisclaimerText}>{amount} {selectedCoin !== null ? selectedCoin.symbol.toUpperCase():""} = {selectedCoin !== null ? priceFormat(amount*coinPrice) :""}</Text>
          <View style={styles.rowStyle}>
            <View style={styles.rowItemStyle}>
              <Text style={styles.labelStyle}>Amount</Text>
            </View>
            <View style={styles.rowItemStyle}>
              <TextInput
                style={styles.input}
                value={String(amount)}
                placeholder="1.00"
                onChangeText={onChangeAmount}
                placeholderTextColor="grey"
                keyboardType="numeric"
              />
            </View>
          </View>
          <View
            style={styles.separator}
          />
          <View style={styles.rowStyle}>
            <View style={styles.rowItemStyle}>
              <Text style={styles.labelStyle}>Date</Text>
            </View>
            <View style={styles.rowItemStyle}>
              <TouchableOpacity title="Open" onPress={() => setOpen(true)}>
                <View>
                  <Text style={styles.dateInput}>
                    {textDate}
                  </Text>
                </View>
              </TouchableOpacity>
              <DatePicker
                modal
                open={open}
                date={date}
                locale={"en"}
                mode={"date"}
                androidVariant={"nativeAndroid"}
                onConfirm={(date) => {
                  onChangeDate(date);
                }}
                onCancel={() => {
                  setOpen(false);
                }}
              />
            </View>
          </View>
          <View
            style={styles.separator}
          />
          <View style={styles.rowStyle}>
            <View style={styles.rowItemStyle}>
              <Text style={styles.labelStyle}>Coin Price</Text>
            </View>
            <View style={styles.rowItemStyle}>
              <TextInput
                style={styles.input}
                onChangeText={onChangePrice}
                value={String(round(coinPrice))}
                placeholder="1.00"
                placeholderTextColor="grey"
                keyboardType={"numeric"}
              />
            </View>
          </View>
          <View
            style={styles.separator}
          />
          <TouchableOpacity onPress={() => addAsset()} style={styles.rowStyle}>
            <View style={styles.addButtonStyle}>
              <Text style={styles.addButtonTextStyle}> {isUpdate ? `Create new Assets`: `Update` }</Text>
            </View>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
      <DropdownAlert
        ref={(ref) => {
          if (ref) {
            dropDownAlertRef = ref;
          }
        }}
      />
      {dataFetching && <AppLoader/>}
    </Modal>
  );
};

const styles = {
  symbolStyle: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 30,
    justifyContent: "center",
    marginLeft: 5,
  },
  convertDisclaimerText: {
    color: "#9a9a9a",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 10,
    justifyContent: "center",
  },
  modal: {
    flex: 1,
    backgroundColor: "#11161D",
    alignItems: "center",
  },
  coinImage: {
    marginTop:25, marginRight: 0, marginBottom: 0,
    justifyContent: "center", height: 49, width: 49, resizeMode: "contain",
  },
  rowStyle: {
    flexDirection: "row",
    alignSelf: "center",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
  },



  labelStyle: {
    color: "#EFB90B",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderColor: "grey",
    backgroundColor: "#353E48",
  },

  dateInput: {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius: 5,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    borderColor: "grey",
    backgroundColor: "#353E48",
  },

  rowItemStyle: {
    flex: 1,
    justifyContent: "center",
  },
  separator: {
    borderWidth: 0.4,
    opacity: 0.3,
    borderColor: "#EFB90B",
    width: "90%",
    marginTop: 20,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: "#2C3640",
  },
  addButtonStyle: {
    borderColor: "#EFB90B",
    borderWidth: 0.7,
    flex: 1,
    borderRadius: 10,

  },
  addButtonTextStyle: {
    justifyContent: "center",
    textAlign: "center",
    color: "#EFB90B",
    padding: 20,
    fontSize: 20,

  },

};

export default AddToPortfolioModal;

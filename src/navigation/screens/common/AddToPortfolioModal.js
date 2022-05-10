import React, { useEffect, useState,useRef } from "react";
import { Text, View, TouchableOpacity, SafeAreaView, Modal, Image, TextInput } from "react-native";
import Header from "./Header";
import DatePicker from "react-native-date-picker";
import Moment from "moment";
import { addAssetToPortfolio, getAllPortfolio, getAssetsByPortfolio } from "../../../storage/allSchema";
import { getCoinGeckoId, getRandomColor, priceFormat, round, validatePriceAndAmount } from "../../../helper/Utils";
import { getHistoryPrice } from "../../../reducers/CryptoApiService";
import DropdownAlert from 'react-native-dropdownalert';

const AddToPortfolioModal = (props) => {
  const { showModal, setShowModal, coin, isUpdate=true } = props;
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  let dropDownAlertRef = useRef();

  // data
  const [textDate, setTextDate] = useState(Moment(new Date()).format("DD-MM-yyyy"));
  const [amount, setAmount] = useState(1);
  const [coinPrice, setCoinPrice] = useState(coin.price);


  //ekleme sayfasındaki validatorler bunlar
  const [amountError,setAmountError] =useState(true);
  const [priceError,setPriceError] =useState(true);



  const getDateFormat = () => {
    Moment.locale("en");
    return date.toISOString();
  };



  useEffect(() => {
    getHistoryPrice(getCoinGeckoId(coin.symbol),textDate).then((res => {
      setCoinPrice(res.data.market_data ? res.data.market_data.current_price.usd : coin.price)
    })).catch(e => {})
  },[textDate])


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
        symbol: coin.symbol,
        name: coin.name,
        coinId: coin.id,
        assetColor: getRandomColor()
      }).then((res) => {
        dropDownAlertRef.alertWithType('success', 'Transaction Successful',
          `Successfully Added ${coin.name.toLowerCase()} To Your Portfolio`);
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
          <Image style={styles.coinImage}
                 source={{ uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/" + coin.id + ".png" }} />

          <Text style={styles.symbolStyle}>{coin.symbol.toUpperCase()}</Text>
          <Text style={styles.convertDisclaimerText}>{amount} {coin.symbol.toUpperCase()} = {priceFormat(amount*coinPrice)}</Text>
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
    </Modal>
  );
};

const styles = {
  symbolStyle: {
    color: "#FFF",
    fontSize: 35,
    fontWeight: "bold",
    marginTop: 10,
    justifyContent: "center",
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
    marginTop: 35, marginRight: 0, marginBottom: 0,
    justifyContent: "center", height: 80, width: 80, resizeMode: "contain",
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

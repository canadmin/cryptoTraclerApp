import React, { useEffect, useState } from "react";
import {Text,View,TouchableOpacity,SafeAreaView,Modal,Image,TextInput} from "react-native";
import Header from "./Header";
import DatePicker from 'react-native-date-picker'
import Moment from 'moment';

const AddToPortfolioModal = (props) => {
  const { showModal, setShowModal } = props;
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)

  // data
  const [textDate,setTextDate] = useState(Moment(new Date()).format('DD-MM-yyyy'))
  const [amount,setAmount] = useState(0);
  const [coinPrice,setCoinPrice] = useState(0);

  const getDateFormat = () =>{
    Moment.locale('en');

    return date.toISOString();
  }


  const onChangeDate = (date) => {
    setOpen(false);
    setDate(date)
    setTextDate(Moment(date).format('DD-MM-yyyy'));
  }
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
            <Image style={styles.coinImage} source={{uri:"https://s2.coinmarketcap.com/static/img/coins/64x64/"+1+".png"}}/>

            <Text style={styles.symbolStyle}>BTC</Text>
            <View style={styles.rowStyle}>
              <View style={styles.rowItemStyle}>
                <Text style={styles.labelStyle}>Amount</Text>
              </View>
              <View style={styles.rowItemStyle}>
                <TextInput
                  style={styles.input}
                  value={amount}
                  placeholder='0'
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
                <TouchableOpacity title="Open" onPress={() => setOpen(true)} >
                  <View >
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
                    setOpen(false)
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
                  value={coinPrice}
                  placeholder='1.00'
                  placeholderTextColor="grey"
                  keyboardType="numeric"
                />
              </View>
            </View>
            <View
              style={styles.separator}
            />
          </View>

        </SafeAreaView>

      </Modal>
  )
}

const styles = {
  symbolStyle :{
    color:'white',
    fontSize:35,
    fontWeight:'bold',
    marginTop: 35,
    justifyContent:'center'
  },
  modal: {
    flex: 1,
    backgroundColor: "#11161D",
    alignItems : 'center',
  },
  coinImage : {
    marginTop:35, marginRight:0, marginBottom: 0,
    justifyContent:'center',height: 80, width: 80, resizeMode: 'contain'
  },
  rowStyle :{
    flexDirection: 'row',
    alignSelf:'center',
    marginLeft:30,
    marginRight: 30,
    marginTop:20
  },
  labelStyle: {
    color: '#EFB90B',
    fontSize: 24,
    fontWeight: 'bold',

  },
  input : {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius:5,
    fontWeight:'bold',
    color:'white',
    textAlign: 'center',
    borderColor: 'grey',
    backgroundColor:'#353E48',
  },

  dateInput : {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius:5,
    fontWeight:'bold',
    color:'white',
    textAlign: 'center',
    borderColor: 'grey',
    backgroundColor:'#353E48',
  },

  rowItemStyle :{
    flex:1,
    justifyContent:'center',
  },
  separator:{
    borderWidth: 0.4,
    opacity: 0.3,
    borderColor: "#EFB90B",
    width:'90%',
    marginTop:20
  },
  safeAreaStyle : {
 flex: 1, backgroundColor: "#2C3640"
  }
}

export default AddToPortfolioModal;

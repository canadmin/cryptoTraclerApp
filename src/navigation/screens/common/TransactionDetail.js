import React from 'react';
import {Text,View} from 'react-native';
import Header from "./Header";
import { useSelector } from "react-redux";

const TransactionDetail = ({navigation,route}) => {
  const coin = route.params.coin;
  const {pageHistory} = useSelector(state => state.userReducer)

  const handleHeaderBackOnPress = () => {
    //burada bağlı olan soketleri kapatacağız.
    navigation.navigate(pageHistory)
  }
  return (
    <View style={styles.container}>
      <Header headerText={coin.symbol.toUpperCase()} isTransactionDetial={true} handleHeaderBackOnPress={handleHeaderBackOnPress}/>
         <Text>
          SSSS
        </Text>
    </View>
  )

}


const styles = {
  container : {
    flex:1,
    backgroundColor: "#11161D",

  }

}

export  default TransactionDetail;

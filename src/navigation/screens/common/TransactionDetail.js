import React, { useEffect,useState } from "react";
import {Text,View} from 'react-native';
import Header from "./Header";
import { useSelector } from "react-redux";
import { getAssetsByPortfolio } from "../../../storage/allSchema";

const TransactionDetail = ({navigation,route}) => {
  const coin = route.params.coin;
  const {pageHistory} = useSelector(state => state.userReducer)
  const [transaction,setTransaction] = useState([])

  const handleHeaderBackOnPress = () => {
    //burada bağlı olan soketleri kapatacağız.
    navigation.navigate(pageHistory)
  };

  useEffect(() => {
    getAssetsByPortfolio(1).then((res) => {
      console.log(res)
    })
  },[])

  return (
    <View style={styles.container}>
      <Header headerText={coin.symbol.toUpperCase()} isTransactionDetial={true} handleHeaderBackOnPress={handleHeaderBackOnPress}/>
      <View style={{marginTop:10,marginRight:10,marginLeft:10}}>
        <View style={{backgroundColor:'green',width:'10%',alignItems:'center'}}>
          <Text>
            Sell
          </Text>
        </View>
        <View>
          <Text>asdasd</Text>
        </View>

      </View>

      <View style={{justifyContent:'center',alignItems:'center'}}>
        <Text>
          Delete All Transaction
        </Text>
      </View>
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

import React from 'react';
import {Text,View} from 'react-native';
import Header from "./Header";

const TransactionDetail = ({navigation,route}) => {
  const coin = route.params.coin;


  return (
    <View style={styles.container}>
      <Header headerText={coin.symbol.toUpperCase()} isPortfolioScreen={true}/>
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

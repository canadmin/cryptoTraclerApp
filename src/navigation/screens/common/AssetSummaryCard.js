import React, { useEffect } from "react";
import {View,Text,TouchableOpacity,Image,Dimensions} from "react-native";
import { priceFormat, round } from "../../../helper/Utils";
import { getCurrenciesFromExtarnalApi, getCurrencyPrice } from "../../../reducers/CryptoApiService";


const window_width = Dimensions.get("window").width;
//%100 window_width-120
const AssetSummaryCard = (props) => {



  const {item,index} = props;
  return (
    <TouchableOpacity style={styles.containerStyle}>
        <View style={{flex:2}}>
          <Image style={styles.coinImage}
                 source={{ uri: "https://s2.coinmarketcap.com/static/img/coins/64x64/" + item.coinId + ".png" }} />
        </View>
      <View style={styles.topRow}>
        <View style={{flex:2}}>
        </View>
        <View style={{flex:3}}>
          <Text style={{color:'white',fontSize:12,alignSelf:'flex-start',fontWeight:'bold'}}>{item.name} </Text>
        </View>
        <View style={{flex:5}}>
          <Text style={{color:'white',fontSize:16,alignSelf:'flex-end',fontWeight:'bold'}}>{priceFormat(item.price*1)} </Text>
        </View>
        <View style={{flex:6}}>
          <Text style={{color:'white',fontSize:18,alignSelf:'flex-end',marginRight:5,fontWeight:'bold'}}>{priceFormat(item.price*item.amount)}</Text>
        </View>
      </View>
      <View style={styles.topRow}>
        <View style={{flex:2}}>
        </View>
        <View style={{flex:3}}>
          <Text style={{color:'white',fontSize:12,alignSelf:'flex-start',fontWeight:"bold", marginTop:5}}>{item.symbol.toUpperCase()}</Text>
        </View>
        <View style={{flex:5}}>
          <Text style={{color:'#70A822',fontSize:12,alignSelf:'flex-end',fontWeight:"bold", marginTop:5}}>0.22%</Text>
        </View>
        <View style={{flex:6}}>
          <Text style={{color:'#A9A9A9',fontSize:12,alignSelf:'flex-end',marginRight:5,marginTop:4,fontWeight:"bold"}}>
            {item.amount.toUpperCase()} {item.symbol.toUpperCase()}</Text>
        </View>
      </View>
      <View style={styles.rowBottom}>

        <View style={{flex:8}}>
          <View
            style={{
              borderWidth: 4,
              opacity: 1,
              borderRadius:30,
              borderColor: item.assetColor,
              marginBottom:3,
              width:window_width-30,
              marginTop:5
            }}
          />
        </View>
      </View>

    </TouchableOpacity>
  )

}


const styles = {
  containerStyle: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 0,
    height: 100,
    borderRadius: 5,
  },
  topRow:{
    marginLeft: 5,
    flexDirection:'row',
  },
  coinImage: {
    marginTop: 30, marginRight: 0, marginBottom: 0,
    justifyContent: "center", height: 30, width: 30, resizeMode: "contain",
  },
  rowBottom:{
    marginLeft: 5,
    flexDirection:'row',
    marginTop:20

  }
}
export default AssetSummaryCard;

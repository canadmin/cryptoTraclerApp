import React, { useEffect,useState } from "react";
import {Text,View,TouchableOpacity} from 'react-native';

import { priceFormat, round } from "../../../helper/Utils";

const TransactionDetailCard = (props) => {

  const {item,index,updateTransactionDetail} = props;
  return (
      <TouchableOpacity onPress={() => {
        updateTransactionDetail(item.id)
      }} style={{marginTop:10,marginRight:10,marginLeft:10,height:100,backgroundColor:'#2C3640',borderRadius:5}}>
        <View style={{flexDirection:'row'}}>
          <View style={ item.isAddTransaction ?
            {backgroundColor:'green',
              width:70,height:30,justifyContent:'center',alignItems:'center',borderTopLeftRadius:10} :
            {backgroundColor:'#8c2f2f',width:70,height:30,justifyContent:'center',alignItems:'center',borderTopLeftRadius:10}}>
            <Text style={{color:'#9a9a9a'}}>
              {item.isAddTransaction ? 'Buy' :'Sell'}
            </Text>
          </View>
          <View style={{flex:2,alignItems:'flex-start',marginLeft:10}}>
            <Text style={{fontSize:19,color:'#9a9a9a'}}>
              {item.transactionDate.toLocaleDateString()}
              {" " +item.transactionDate.toLocaleTimeString()}
            </Text>
          </View>
        </View>
        <View style={{flexDirection:'row', marginTop:5}}>
          <View style={{flexDirection:'column',flex:2,marginLeft:20}}>
            <View style={{}}>
              <Text style={{color:'#9a9a9a'}}>
                {item.isAddTransaction ? 'Buy Price' :'Sell Price'}

              </Text>
            </View>
            <View>
              <Text style={{color:'#9a9a9a'}}>
                {priceFormat(round(item.price))}
              </Text>
            </View>
          </View>

          <View style={{flexDirection:'column',flex:1,alignItems:'flex-end',marginRight:20}}>
            <View>
              <Text style={{color:'#9a9a9a'}}>
                Amount
              </Text>
            </View>
            <View>
              <Text style={{color:'#9a9a9a'}}>
                {item.amount}
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems:'center',marginTop:-15}}>
          <View style={{alignItems:'center'}}>
            <View>
              <Text style={{color:'#9a9a9a',fontSize:16}}>
                Total Transaction
              </Text>
            </View>
            <View >
              <Text style={{color:'#9a9a9a',fontSize:16}}>
                {priceFormat(item.amount * item.price)}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

  )

}



export  default TransactionDetailCard;

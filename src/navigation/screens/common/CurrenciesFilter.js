import React,{useState} from 'react';
import {Text,View,TextInput} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";

const CurrenciesFilter = (props) => {

  const {searchInput,onchangeSearchInput} = props;

  return (
    <View style={{flexDirection:"row"}}>

          <TextInput
            style={styles.input}
            onChangeText={onchangeSearchInput}
            value={searchInput}
            placeholder="search: bitcoin"
            placeholderTextColor="grey"
          />
      <Ionicons style={{marginTop:15,marginRight:10}} name={"filter"} size={30} color={"#EFB90B"} />

    </View>
  )
}

const styles = {
  containerStyle:{

  },
  input : {
    height: 40,
    margin: 12,
    padding: 10,
    borderRadius:10,
    fontWeight:'bold',
    color:'white',
    backgroundColor:'#353E48',
    flex:2

  }

}


export default CurrenciesFilter;

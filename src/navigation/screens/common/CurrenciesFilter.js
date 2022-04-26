import React,{useState} from 'react';
import {Text,View,TextInput} from 'react-native';


const CurrenciesFilter = (props) => {

  const {searchInput,onchangeSearchInput} = props;

  return (
    <View>
          <TextInput
            style={styles.input}
            onChangeText={onchangeSearchInput}
            value={searchInput}
            placeholder="Search Coins"
          />
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

  }

}


export default CurrenciesFilter;

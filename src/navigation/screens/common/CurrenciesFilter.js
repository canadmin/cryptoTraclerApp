import React,{useState} from 'react';
import {Text,View,TextInput} from 'react-native';


const CurrenciesFilter = (props) => {

  const {searchInput,onchangeSearchInput,} = props;
  const [number, onChangeNumber] = useState("asdas");

  return (
    <View>
          <TextInput
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
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
    borderWidth: 2,
    padding: 10,
    backgroundColor:'#917d7d',

  }

}


export default CurrenciesFilter;

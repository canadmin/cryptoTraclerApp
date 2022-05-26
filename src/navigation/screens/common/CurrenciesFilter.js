import React,{useState,useRef} from 'react';
import {Text,View,TextInput,TouchableOpacity} from 'react-native';

import Ionicons from "react-native-vector-icons/Ionicons";
import FilterModal from "./FilterModal";

const CurrenciesFilter = (props) => {

  const {searchInput,onchangeSearchInput} = props;
  const pickerRef = useRef();
  const [selectedLanguage, setSelectedLanguage] = useState();
  const [showFilter,setShowFilter] = useState(false);

  return (
    <View style={{flexDirection:"row"}}>
          <TextInput
            style={styles.input}
            onChangeText={onchangeSearchInput}
            value={searchInput}
            placeholder="search: bitcoin"
            placeholderTextColor="grey"
          />
       <TouchableOpacity onPress={() => setShowFilter(true)}>
         <Ionicons style={{marginTop:15,marginRight:10}} name={"filter"} size={30} color={"#EFB90B"} />

       </TouchableOpacity>
      <FilterModal setShowModal={setShowFilter} showModal={showFilter}>
        <View style={{flexDirection:"row"}}>
          <TouchableOpacity
            onPress={() =>setShowFilter(false)}
            style={{width:"100%",height:40,alignItems:'flex-end',justifyContent:'center', position:'absolute'}}>
            <Ionicons style={{marginTop:-50,marginRight:-10}} name={"close"} size={30} color={"#EFB90B"} />

          </TouchableOpacity>
          <View style={{marginTop:5,    justifyContent:'center',
            alignItems:'center'}}>
            <View >
              <Text>Save Filter</Text>
            </View>
          </View>

        </View>
        <View >
          <View style={{marginTop:5,
            justifyContent:'center',
            alignItems:'center'}}>
            <View >
              <Text>Filtreleme işlemi gerçekleştirilecek</Text>
            </View>
          </View>

        </View>
      </FilterModal>
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

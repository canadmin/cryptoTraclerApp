import React, { useEffect, useState } from "react";

import {View,Text,FlatList,TextInput,TouchableOpacity} from 'react-native';
import CurrencySummaryCard from "./CurrencySummaryCard";
import Ionicons from "react-native-vector-icons/Ionicons";

const CustomSearch = (props) => {


  const {data,setSelectedCoin,setDataFetching} = props;
  const [query,setQuery] = useState("");
  const [filtered,setFiltered] = useState([])
  const [showResults,setShowResult] = useState(true)

  useEffect(() => {
    if(query === "") {
      setFiltered([])
      setShowResult(false)
    }else {
      setShowResult(true)
      setDataFetching(true)
      let filteredData = data.filter( (item) => {
        return item.name.toLowerCase().includes(query.toLowerCase()) || item.symbol.toLowerCase().includes(query.toLowerCase());
      });
      setDataFetching(false)
      setFiltered(filteredData);
    }

  },[query])

  const setCoin = (item) => {
    setShowResult(false)
    setSelectedCoin(item)
    setQuery("")
    setFiltered([])
  }
  const renderItem = ({ item,index}) => (
    <TouchableOpacity onPress={() => setCoin(item)} style={{height:40,justifyContent:'flex-start',flexDirection:'row'}}>
      <Text style={{fontSize:16,marginLeft:20,marginTop:10,marginBottom:10,color:'#ffffff'}}>{item.name}</Text>
      <Text style={{fontSize:11,marginLeft:5,marginTop:15,marginBottom:10,color:'#ffffff'}}>({item.symbol.toUpperCase()})</Text>
    </TouchableOpacity>
  );
  const getItemLayout = (data, index) => (
    {length: 100, offset: 100 * index, index}
  );
  return (

    <View style={{ position:'absolute',width:'100%',zIndex:3,backgroundColor:'#353E48'}}>
      <View style={{backgroundColor:'#2C3640',width:'100%',flexDirection:"row"}}>
        <TextInput
          style={styles.input}
          onChangeText={setQuery}
          value={query}
          placeholder="search coin"
          placeholderTextColor="grey"
        />
        {query.length > 0 &&
        <TouchableOpacity onPress={() => {setQuery("")}} style={{position:'absolute',right:15,top:15,zIndex:299,
          width:30,height:30}}>
          <Ionicons name={'ios-close-circle-outline'} color={'#9a9a9a'} size={30} />
        </TouchableOpacity>}


      </View>
      {query.length>0 && showResults && <FlatList data={filtered}
                                                  initialNumToRender={5}
                                                  initialNumToRender={10}
                                                  windowSize={10}
                                                  maxToRenderPerBatch={5}
                                                  getItemLayout={getItemLayout}
                                                  updateCellsBatchingPeriod={30}
                                   renderItem={renderItem}
      />}

    </View>


  )
}

const styles = {
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

export default CustomSearch;


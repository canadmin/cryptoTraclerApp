import React, { useState, useEffect } from "react";
import { View, Text, FlatList,Alert } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCryptoInfo } from "../../reducers/CryptoApiService";
import { deleteFavorites, getAllFavorites } from "../../storage/allSchema";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";

const WatchList = ({navigation}) => {
  const { containerStyle, textStyle, addWatchListButton } = styles;
  const [coins, setCoins] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    let favorites = "";
    getAllFavorites().then(res => {
      setFavorites(res);
      if (res !== undefined) {
        res.forEach(item => {
          favorites += item.symbol + ",";
        });
      }
    }).then(() => {
      getCryptoInfo(favorites)
        .then((res) => {
          let data = res.data;
          let currencies = data.map((item,index) => {
            return {
              name: item.name,
              symbol: item.symbol.toLowerCase(),
              price: item.quote.USD.price,
              id: item.id,
              key:index
            };
          });
          setCoins(currencies);
        }).catch((er) => {
        console.log(er);
      });
    });
  }, []);
  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then(() => {
    });
  };
  return (
    <View style={containerStyle}>
      <Header headerText={"Watch List"}></Header>
      {coins.length > 0 &&
      <FlatList data={[...coins, { add: true }]}
                initialNumToRender={5}

                renderItem={({ item, index }) => {
                  if (item.add) {
                    return(                    <TouchableOpacity onPress={() => Alert.alert(`Coin Arama ve Ekleme modalı açılacak`)}>
                        <View style={addWatchListButton}>
                          <Ionicons name={"add-sharp"} size={30} color={'#EFB90B'} />
                          <Text style={{ color: "white" }}>
                            Add coins to Watchlist
                          </Text>
                        </View>
                      </TouchableOpacity>
                      ) ;
                  } else {
                    return <CurrencySummaryCard item={item}
                                                index={index}
                                                favorites={favorites}
                                                deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                                                navigation={navigation}
                                                getRealTimeData={true} />;
                  }
                }
                }
      />}

    </View>);
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#11161D",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
  addWatchListButton:{
    height: 50,
    flexDirection:'row',
    backgroundColor: '#1C2834',
    marginTop:10,
    marginLeft:50,
    marginRight: 50,
    justifyContent:'center',
    alignItems:'center'
  }
};

export default WatchList;


import React, { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import CurrencySummaryCard from "./common/CurrencySummaryCard";
import Header from "./common/Header";
import { getCryptoInfo } from "../../reducers/CryptoApiService";
import { deleteFavorites, getAllFavorites } from "../../storage/allSchema";

const WatchList = () => {
  const { containerStyle, textStyle } = styles;
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
          let currencies = data.map((item) => {
            return {
              name: item.name,
              symbol: item.symbol.toLowerCase(),
              price: item.quote.USD.price,
              id:item.id
            };
          });
          setCoins(currencies);
        }).catch((er) => {
        console.log(er);
      });
    });
  }, []);
  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then(()=> {
    });
  };
  return (
    <View style={containerStyle}>
      <Header headerText={"Watch List"}></Header>
      {coins.length > 0 &&
      <FlatList data={[...coins,{add:true}]}
                renderItem={({ item,index }) =>{
                  if(item.add){
                    return     <View>
                      <Text style={{color:'white'}}>Add</Text>
                    </View>
                  }else {
                    return <CurrencySummaryCard item={item}
                                         index={index}
                                         favorites={favorites}
                                         deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                                         getRealTimeData={true} />
                  }
                }
                  }
      />}

    </View>);
};

const styles = {
  containerStyle: {
    flex: 1,
    backgroundColor: "#262424",
  },
  textStyle: {
    fontWeight: "bold",
    color: "#D5FA50",
  },
};

export default WatchList;


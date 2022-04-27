import React, { useEffect, useState } from "react";
import { Modal, Text, View, FlatList, SafeAreaView } from "react-native";
import Header from "./Header";
import { getCurrencies } from "../../../reducers/CryptoApiService";
import CurrencySummaryCard from "./CurrencySummaryCard";
import { deleteFavorites, getAllFavorites, insertFavorites } from "../../../storage/allSchema";
import { useDispatch, useSelector } from "react-redux";
import { addWatchList, removeWatchList } from "../../../redux/action";
import CurrenciesFilter from "./CurrenciesFilter";

const addCoinToFavModal = (props) => {

  const { showModal, setShowModal } = props;
  const [searchInput,onchangeSearchInput] = useState("");


  const [coins, setCoins] = useState([]);

  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    getAllFavorites().then(res => {
      if (res !== null) {
        setFavorites(res);
      }
    }).then((res) => {
      getCurrencies("top10").then(res => {
        let data = res.data;
        let currencies = data.map((item, index) => {
          return {
            ...item,
            symbol: item.symbol.toLowerCase(),
            key: index,
          };
        });
        setCoins(currencies);
      });
    });
    return () => {
    };
  }, []);
  const addCurrencyToFavorite = (coin) => {
    insertFavorites({ symbol: coin.symbol, name: coin.name }).then((res) => {
    }).then(() => {
      dispatch(addWatchList(coin));
    });
  };

  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then((res => {
      dispatch(removeWatchList(coin));
    }));
  };
  // all coins paramını kullanarak tüm coinleri bir flatlistte basıcaz
  // sonrasında bu coinlere arama çekicez filtreleme yapıcaz

  //filtreleme componenti ortak bir component olacak
  const renderItem = ({ item, index }) => (
    <CurrencySummaryCard item={item}
                         index={index}
                         addCurrencyToFavorite={addCurrencyToFavorite}
                         deleteCurrencyFromFavorite={deleteCurrencyFromFavorite}
                         favorites={favorites}
                         key={index}
                         searchFromModal={true}
                         getRealTimeData={true} />
  );
  return (

    <Modal
      animationType={"slide"}
      transparent={false}
      visible={showModal}
      onRequestClose={() => {
      }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#2C3640" }}>
        <Header isModal={true} headerText={"Search Coin"} setShowModal={setShowModal}> </Header>
        <CurrenciesFilter searchInput={searchInput} onchangeSearchInput={onchangeSearchInput}></CurrenciesFilter>

        <View style={styles.modal}>

          <FlatList data={coins} renderItem={renderItem} />
        </View>
      </SafeAreaView>

    </Modal>

  );
};


const styles = {
  modal: {
    flex: 1,
    backgroundColor: "#11161D",
  },

};


export default addCoinToFavModal;
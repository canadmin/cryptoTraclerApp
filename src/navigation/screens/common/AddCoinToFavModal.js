import React, { useEffect, useState } from "react";
import { Modal, Text, View, FlatList, SafeAreaView } from "react-native";
import Header from "./Header";
import { getCurrencies } from "../../../reducers/CryptoApiService";
import CurrencySummaryCard from "./CurrencySummaryCard";
import { deleteFavorites, getAllFavorites, insertFavorites } from "../../../storage/allSchema";
import { useDispatch, useSelector } from "react-redux";
import { addAllCoins, addWatchList, removeWatchList } from "../../../redux/action";
import CurrenciesFilter from "./CurrenciesFilter";
import AppLoader from "./AppLoader";

const addCoinToFavModal = (props) => {

  const { showModal, setShowModal } = props;
  const [searchInput,onchangeSearchInput] = useState("");
  const {allCoins} = useSelector(state => state.userReducer)

  const [dataFetching,setDataFetching] = useState(false);

  const [coins, setCoins] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    setDataFetching(true)
    getAllFavorites().then(res => {
      if (res !== null) {
        setFavorites(res);
      }
    }).then((res) => {
      if(allCoins.length < 1 ){
        getCurrencies("all").then(async res => {
          let data = res.data;
          let currencies = data.map((item,index) => {
            return {
              ...item,
              symbol: item.symbol.toLowerCase(),
              price: item.quote.USD.price,
              key:index,
              percent_change_1h:item.quote.USD.percent_change_24h,
              percent_change_24h:item.quote.USD.percent_change_24h,
              percent_change_7d:item.quote.USD.percent_change_7d,
              percent_change_30d:item.quote.USD.percent_change_30d,
              percent_change_60d:item.quote.USD.percent_change_60d,
              percent_change_90d:item.quote.USD.percent_change_90d,
              market_cap:item.quote.USD.market_cap,
            };
          });
          setCoins(currencies);
          setFiltered(currencies);
          await dispatch((addAllCoins(currencies)))
          setDataFetching(false)

        }).catch(e => {});
      }else{
        setCoins(allCoins);
        setFiltered(allCoins);
        setDataFetching(false)
      }


    }).catch(e => {});
    return () => {
      setCoins([])
      setFiltered([])
    };
  }, []);

  useEffect(() => {
    let filteredData = coins.filter(function (item) {
      return item.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setFiltered(filteredData);
  },[searchInput])


  const addCurrencyToFavorite = (coin) => {
    insertFavorites({ symbol: coin.symbol, name: coin.name }).then((res) => {
    }).then(() => {
      dispatch(addWatchList(coin));
    }).catch(e => {});
  };

  const deleteCurrencyFromFavorite = (coin) => {
    deleteFavorites(coin.symbol).then((res => {
      dispatch(removeWatchList(coin));
    })).catch(e => {});
  };

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

          <FlatList data={filtered} renderItem={renderItem} />
        </View>
      </SafeAreaView>
      {dataFetching && <AppLoader/>}

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

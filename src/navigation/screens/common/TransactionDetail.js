import React, { useEffect,useState } from "react";
import {Text,View,ScrollView,TouchableOpacity} from 'react-native';
import Header from "./Header";
import { useSelector } from "react-redux";
import { getAssetsByPortfolio, deleteAllTransaction, getAssetTransactionDetail } from "../../../storage/allSchema";
import TransactionDetailCard from "./TransactionDetailCard";
import AddToPortfolioModal from "./AddToPortfolioModal";


const TransactionDetail = ({navigation,route}) => {
  const coin = route.params.coin;
  const {pageHistory} = useSelector(state => state.userReducer)
  const [transaction,setTransaction] = useState([])
  const [showModal,setShowModal] = useState(false);
  const [selectedTransaction,setSelectionTransaction] = useState(null);

  const handleHeaderBackOnPress = () => {
    //burada bağlı olan soketleri kapatacağız.
    navigation.navigate(pageHistory)
  };


  const updateTransactionDetail = (id) => {
    setSelectionTransaction(transaction.filter(elem => elem.id === id)[0]);
    setShowModal(true)
  }
  useEffect(() => {
    getAssetTransactionDetail(1,coin.coinId).then((res) => {
      setTransaction(res)
    })
  },[])

  const removeAllTransaction = (coinId) => {
    deleteAllTransaction(coinId,1).then(() => {
    }).catch(() => {

    })
  }
  return (
    <ScrollView style={styles.container}>
      <Header headerText={coin.symbol.toUpperCase()} isTransactionDetial={true} handleHeaderBackOnPress={handleHeaderBackOnPress}/>

      {transaction && transaction.map((item,idx) => (
        <TransactionDetailCard
        item={item}
        index={idx}
        updateTransactionDetail={updateTransactionDetail}
        />

      ))}
      <TouchableOpacity
        onPress={() => {
          removeAllTransaction(coin.coinId)
        }} style={{justifyContent:'center',alignItems:'center',backgroundColor:"#8c2f2f",marginTop:10,marginBottom:10,
      height:50,marginLeft:10,marginRight:10}}>
        <Text style={{fontSize:20,fontWeight:"bold",color:"#9a9a9a"}}>
          Delete All Transaction
        </Text>
      </TouchableOpacity>
      {showModal && <AddToPortfolioModal headerText={"Update Transaction"}
                                         setShowModal={setShowModal}
                                         showModal={showModal}
                                         coin={coin}
                                         isUpdate={true}
                                         modalInPortfolio={false}
                                         showCoinSearch={false} />}
    </ScrollView>
  )
}

const styles = {
  container : {
    flex:1,
    backgroundColor: "#11161D",
  }
}

export  default TransactionDetail;

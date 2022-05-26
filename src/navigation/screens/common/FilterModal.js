import React from "react";
import {View,Text,Modal,TouchableOpacity} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";



const FilterModal = (props) => {
  const { showModal, setShowModal,children } = props;



  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <View style={styles.modalContainer}>
          {children}
        </View>
      </View>

    </Modal>
  )

}

const styles = {
  modalBackGround: {
    flex:1,
    backgroundColor:"rgba(0,0,0,0.5)",
    justifyContent:'center',
    alignItems:'center'
  },
  modalContainer : {
    width:"80%",
    backgroundColor: '#353E48',
    paddingHorizontal:20,
    paddingVertical:30,
    height:200,
    borderRadius: 5,
    elevation: 20
  }
}

export default FilterModal;

import React from "react";
import { Text, View,TouchableOpacity,StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  const { headerText,isDetailScreen, handleHeaderBackOnPress ,isModal,setShowModal,isPortfolioScreen} = props;
  const { textStyle, viewStyle,headerInsideStyle,headerTextStyle,headerRightComponent } = styles;

  const back = () => {
    if(isModal){
      setShowModal(false)
    }else {
      handleHeaderBackOnPress()
    }
  }

  return (
    <View style={viewStyle}>
      <View style={headerInsideStyle}>
        { (isDetailScreen || isModal) &&
        <TouchableOpacity onPress={() => back("pageHistory")}>

        <View style={styles.headerBackButtonStyle}>
            <Text>
              <Ionicons name={"arrow-back-outline"} size={30} color={'#EFB90B'} />
            </Text>

        </View>
        </TouchableOpacity>
        }
        <View style={headerTextStyle}>
          <Text style={textStyle}>
            {headerText}
          </Text>
        </View>
        {isDetailScreen && <View style={headerRightComponent}>
          <Text>
            <Ionicons name={"md-star-sharp"} size={30} color={'#EFB90B'} />
          </Text>
        </View>}
        {isPortfolioScreen && <View style={headerRightComponent}>
          <TouchableOpacity onPress={() => {props.showActionSheet()}}>
            <View>
              <Ionicons name={"md-add-outline"} size={30} color={'#EFB90B'} />
            </View>
          </TouchableOpacity>
        </View>}
      </View>
    </View>
  );
};

//md-star-outline
const styles = StyleSheet.create({
  textStyle: {
    fontSize: 22,
    //textAlign:"center",
    color: "#EFB90B",
    fontWeight: "normal",
    fontFamily:'Feather'
  },

  headerInsideStyle : {
    flexDirection: "row",
    paddingLeft:10,
    paddingRight:10
  },
  headerTextStyle : {
 flex: 1, alignItems:'center'
  },
  headerBackButtonStyle : {
    alignItems: 'flex-start'
  },

  viewStyle: {
    backgroundColor: "#2C3640",
    height: 40,
    justifyContent: "flex-start", // flex-end, flex-start
    //alignItems: flex-end , center, flex-start
    alignItems: "center",
    position:'relative'
    //borderBottomLeftRadius:20,
    //borderBottomRightRadius:20,
    //shadowOffset:{width: 0, height: 2},
  },

  headerRightComponent : {
    alignItems: 'flex-start'
  }
});

export default Header;

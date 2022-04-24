import React from "react";
import { Text, View,TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Header = (props) => {
  const { headerText,isDetailScreen, handleHeaderBackOnPress } = props;
  const { textStyle, viewStyle } = styles;

  const back = () => {
    handleHeaderBackOnPress()
  }

  return (
    <View style={viewStyle}>
      <View style={{ flexDirection: "row", paddingLeft:10,paddingRight:10 }}>
        { isDetailScreen &&
        <TouchableOpacity onPress={() => back("pageHistory")}>

        <View style={{ alignItems: 'flex-start' }}>
            <Text>
              <Ionicons name={"arrow-back-outline"} size={30} color={'#EFB90B'} />
            </Text>

        </View>
        </TouchableOpacity>
        }
        <View style={{ flex: 1, alignItems:'center' }}>
          <Text style={textStyle}>
            {headerText}
          </Text>
        </View>
        {isDetailScreen && <View style={{ alignItems: 'flex-start' }}>
          <Text>
            <Ionicons name={"md-star-sharp"} size={30} color={'#EFB90B'} />
          </Text>
        </View>}
      </View>
    </View>
  );
};

//md-star-outline
const styles = {
  textStyle: {
    fontSize: 22,
    //textAlign:"center",
    color: "#EFB90B",
    fontWeight: "normal",
  },
  viewStyle: {
    backgroundColor: "#2C3640",
    height: 40,
    justifyContent: "flex-start", // flex-end, flex-start
    //alignItems: flex-end , center, flex-start
    alignItems: "center",
    //borderBottomLeftRadius:20,
    //borderBottomRightRadius:20,
    //shadowOffset:{width: 0, height: 2},
    shadowOpacity: 1,
  },
};

export default Header;

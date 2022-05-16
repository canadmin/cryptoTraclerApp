import  React,{useState} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import PortfolioScreen from "./screens/PortfolioScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AlertScreen from "./screens/AlertScreen";
import {WatchListStackNavigator,CurrenciesListStackNavigator} from './../router/homeStacks';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCurrencies } from "../reducers/CryptoApiService";
import { addAllCoins } from "../redux/action";
import AppLoader from "./screens/common/AppLoader";
import { TouchableOpacity,View } from "react-native";
const Tab = createBottomTabNavigator();

const currenciesList_screen = "Currency List";
const watchList_screen = "Watch List";
const portfolio_screen = "My Portfolio";
const alert_screen = "Create Alarm";
const settings_screen = "Preferences";

const MainContainer = () => {
  const dispatch = useDispatch();
  const [dataFetching,setDataFetching] = useState(false);
  useEffect(() => {
    setDataFetching(false)

  },[])

  const CustomBottomBarIcon = ({children,onPress}) => {
   return( <TouchableOpacity
    style={{
      top:-25,
      justifyContent:'center',
      alignItems:'center',
    }}
    onPress={onPress}>
      <View style={{
        borderRadius:50,
        width:70,
        height: 70,
        backgroundColor: '#1C2834',
        borderWidth:1,
        borderColor:"#EFB90B",
      }}>
        {children}
      </View>

    </TouchableOpacity>
   )
  }
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={watchList_screen}
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          unmountOnBlur: true,
          headerShown: false,
          tabBarStyle: {
            position: "relative",
            bottom: 0,
            left: 0,
            right: 0,
            elevation: 0,
            backgroundColor: "#1C2834",
            height: 70,
            paddingBottom: 15,
          },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;
            if (rn === watchList_screen) {
              iconName = focused ? "star" : "star-outline";
              color = focused ? '#EFB90B' : color;
            } else if (rn === currenciesList_screen) {
              iconName = focused ? "list" : "list-outline";
              color = focused ? '#EFB90B' : color;
            }  else if (rn === alert_screen) {
              iconName = focused ? "alarm" : "alarm-outline";
              color = focused ? '#EFB90B' : color;
            } else if (rn === settings_screen) {
              iconName = focused ? "settings" : "settings-outline";
              color = focused ? '#EFB90B' : color;
            }

            return <Ionicons name={iconName} size={size} color={color} />;

          },
        })}

      >
        <Tab.Screen component={WatchListStackNavigator} name={watchList_screen} />
        <Tab.Screen component={CurrenciesListStackNavigator} name={currenciesList_screen} />
        <Tab.Screen options={{
          tabBarButton:(props => (
            <CustomBottomBarIcon {...props}></CustomBottomBarIcon>
          )),
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
              iconName = focused ? "wallet" : "wallet-outline";
              color = focused ? '#EFB90B' : color;
            return <Ionicons name={iconName} size={size} color={color} />;

          },
        }} component={PortfolioScreen} name={portfolio_screen} />
        <Tab.Screen component={AlertScreen} name={alert_screen} />

        <Tab.Screen component={SettingsScreen} name={settings_screen} />
      </Tab.Navigator>
      {dataFetching && <AppLoader/>}

    </NavigationContainer>

  );
};


export default MainContainer;

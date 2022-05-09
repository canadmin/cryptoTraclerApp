import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import PortfolioScreen from "./screens/PortfolioScreen";
import SettingsScreen from "./screens/SettingsScreen";
import AlertScreen from "./screens/AlertScreen";
import {WatchListStackNavigator,CurrenciesListStackNavigator} from './../router/homeStacks';
const Tab = createBottomTabNavigator();

const currenciesList_screen = "Currency List";
const watchList_screen = "Watch List";
const portfolio_screen = "My Portfolio";
const alert_screen = "Create Alarm";
const settings_screen = "Preferences";

const MainContainer = () => {
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


            } else if (rn === portfolio_screen) {
              iconName = focused ? "wallet" : "wallet-outline";
              color = focused ? '#EFB90B' : color;


            } else if (rn === alert_screen) {
              iconName = focused ? "alarm" : "alarm-outline";
              color = focused ? '#EFB90B' : color;


            } else if (rn === settings_screen) {
              iconName = focused ? "settings" : "settings-outline";
              color = focused ? '#EFB90B' : color;

            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;

          },
        })}

      >
        <Tab.Screen component={WatchListStackNavigator} name={watchList_screen} />
        <Tab.Screen component={CurrenciesListStackNavigator} name={currenciesList_screen} />
        <Tab.Screen component={PortfolioScreen} name={portfolio_screen} />
        <Tab.Screen component={AlertScreen} name={alert_screen} />
        <Tab.Screen component={SettingsScreen} name={settings_screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default MainContainer;

import * as React from "react";
import { View, Text, Image } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import alert from "../../assets/bottom/alert.png";
import alert_outline from "../../assets/bottom/alert-outline.png";

import coins from "../../assets/bottom/coins.png";
import coins_outline from "../../assets/bottom/coins-outline.png";

import portfolio from "../../assets/bottom/portfolio.png";
import portfolio_outline from "../../assets/bottom/portfolio-outline.png";


import settings from "../../assets/bottom/settings.png";
import settings_outline from "../../assets/bottom/settings-outline.png";
import Ionicons from 'react-native-vector-icons/Ionicons';


import WatchList from "./screens/WatchList";
import PortfolioScreen from "./screens/PortfolioScreen";
import AlertScreen from "./screens/AlertScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

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
          headerShown: false,
          tabBarStyle: {
              position:'relative',
              bottom:0,
              left:0,
              right:0,
              elevation:0,
              backgroundColor:'#191a19',
              height:70,
              paddingBottom:15,
        },

          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === watchList_screen) {
              iconName = focused ? 'star' : 'star';

            } else if (rn === portfolio_screen) {
              iconName = focused ? 'wallet' : 'wallet-outline';

            } else if (rn === alert_screen) {
              iconName = focused ?  'alarm' : 'alarm-outline';

            } else if (rn === settings_screen) {
              iconName = focused ?  'settings' : 'settings-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;

          },
        })}

        >
        <Tab.Screen component={WatchList} name={watchList_screen}/>
        <Tab.Screen component={PortfolioScreen} name={portfolio_screen} />
        <Tab.Screen component={AlertScreen} name={alert_screen} />
        <Tab.Screen component={SettingsScreen} name={settings_screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default MainContainer;

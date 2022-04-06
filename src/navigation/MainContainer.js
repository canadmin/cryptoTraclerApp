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


import ListCoinsScreen from "./screens/ListCoinsScreen";
import PortfolioScreen from "./screens/PortfolioScreen";
import AlertScreen from "./screens/AlertScreen";
import SettingsScreen from "./screens/SettingsScreen";

const Tab = createBottomTabNavigator();

const allCoins_screen = "All Coins";
const portfolio_screen = "My Portfolio";
const alert_screen = "Create Alarm";
const settings_screen = "Preferences";

const MainContainer = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName={allCoins_screen}
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarStyle: {
          paddingVertical: Platform.OS === 'ios' ? 20 : 1,
            labelStyle: { paddingBottom: 5, fontSize: 0,paddingTop: 4, height: 100 },
            style: { padding: 20, height: 100}
        },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === allCoins_screen) {
              iconName = focused ? coins : coins_outline;

            } else if (rn === portfolio_screen) {
              iconName = focused ? portfolio : portfolio_outline;

            } else if (rn === alert_screen) {
              iconName = focused ? alert : alert_outline;

            } else if (rn === settings_screen) {
              iconName = focused ? settings : settings_outline;
            }

            // You can return any component that you like here!
            return <Image source={iconName} size={""}
                          color={color} style={{width :30, height: 30} } />;
          },
        })}

        >
        <Tab.Screen component={ListCoinsScreen} name={allCoins_screen} />
        <Tab.Screen component={PortfolioScreen} name={portfolio_screen} />
        <Tab.Screen component={AlertScreen} name={alert_screen} />
        <Tab.Screen component={SettingsScreen} name={settings_screen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default MainContainer;

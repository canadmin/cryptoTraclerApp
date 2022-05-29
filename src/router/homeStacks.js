import React from "react";
import {Animated,Easing} from 'react-native'
import WatchList from "../navigation/screens/WatchList";
import CurrenciesList from "../navigation/screens/CurrenciesList";
import CoinDetailScreen from "../navigation/screens/common/CoinDetailScreen";
import PortfolioScreen from "../navigation/screens/PortfolioScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator,CardStyleInterpolators } from '@react-navigation/stack';
import TransactionDetail from "../navigation/screens/common/TransactionDetail";

const Stack = createStackNavigator();


const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 1,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
    useNativeDriver:true,
  }
}
export const WatchListStackNavigator = () => {
   return (
     <Stack.Navigator
       screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
         gestureDirection: 'horizontal',
         transitionSpec: {
           open: config,
           close: closeConfig,
         },
         cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
       })}>
        <Stack.Screen name={"WatchList"}
        component={WatchList}/>
        <Stack.Screen name={"CoinDetailScreen"}
                      component={CoinDetailScreen}/>
       <Stack.Screen name={"PortfolioScreen"}
                     component={PortfolioScreen}/>
     </Stack.Navigator>
   )
}

export const CurrenciesListStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      })}>
      <Stack.Screen name={"CurrenciesList"}
                    component={CurrenciesList}/>
      <Stack.Screen name={"CoinDetailScreen"}
                    component={CoinDetailScreen}/>
    </Stack.Navigator>
  )
}


export const PortfolioStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator:CardStyleInterpolators.forHorizontalIOS,
      })}>
      <Stack.Screen name={"PortfolioScreen"}
                    component={PortfolioScreen}/>
      <Stack.Screen name={"TransactionDetail"}
                    component={TransactionDetail}/>
    </Stack.Navigator>
  )
}




import React from "react";
import WatchList from "../navigation/screens/WatchList";
import CurrenciesList from "../navigation/screens/CurrenciesList";
import CoinDetailScreen from "../navigation/screens/common/CoinDetailScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();


export const WatchListStackNavigator = () => {
   return (
     <Stack.Navigator
       screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          gestureEnabled:true,
          gestureDirection:'horizontal',
       })}>
        <Stack.Screen name={"WatchList"}
        component={WatchList}/>
        <Stack.Screen name={"CoinDetailScreen"}
                      component={CoinDetailScreen}/>
     </Stack.Navigator>
   )
}

export const CurrenciesListStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
      })}>
      <Stack.Screen name={"CurrenciesList"}
                    component={CurrenciesList}/>
      <Stack.Screen name={"CoinDetailScreen"}
                    component={CoinDetailScreen}/>
    </Stack.Navigator>
  )
}




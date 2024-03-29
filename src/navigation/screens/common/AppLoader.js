import React,{useRef,useEffect} from "react";
import {View,StyleSheet} from 'react-native';

import LottieView from 'lottie-react-native';

const AppLoader = () =>{

  return (
    <View style={[StyleSheet.absoluteFillObject,styles.container]}>
        <LottieView source={require('../../../../assets/loading.json')}
                    autoPlay loop
        />

    </View>
  )
}

const styles = {
  container : {
      justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1222
  }
}
export default AppLoader;

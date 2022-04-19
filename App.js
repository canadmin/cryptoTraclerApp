import  React,{useState} from 'react';
import MainContainer from "./src/navigation/MainContainer";
import Colors from "./src/Colors";
import {
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';

import {Provider} from 'react-redux'
import {Store as store} from './src/redux/store'
const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

const App = () => {

  const [statusBarStyle, setStatusBarStyle] = useState(STYLES[2]);
  const [statusBarTransition, setStatusBarTransition] = useState(TRANSITIONS[0]);
  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darkBackground : Colors.darkPrimaryText,
  };

  return(
    <Provider store={store}>
      <SafeAreaView style={{flex:1,backgroundColor:'#5b5866'}}>
        <StatusBar
          animated={true}
          backgroundColor="#5b5866"
          barStyle={statusBarStyle}
          showHideTransition={statusBarTransition}
          hidden={false}
        />
        <MainContainer style={{backgroundStyle}} />
      </SafeAreaView>
    </Provider>
  )
};

export default App;


// color
// lemon green #D5FA50
//card bg #232323
// #000000
// bej #FAFAFA

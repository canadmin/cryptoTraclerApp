import { SET_USER_WATCHLIST, REMOVE_USER_WATCHLIST, ADD_PAGE_HISTORY, ADD_ALL_COIN,SWITCH_THEME } from "./action";
import {darkTheme,lightTheme} from '../Theme'

const initialState = {
   watchedCoins : [],
   pageHistory : '', // geri dönme butonunda tutulacak olan stack
   activePortfolio: 0, // portfolio sayfasında gösterilecek olan porföy
   allCoins : [] , // ilk başta 5000 coini bir state tutacağız,
   theme : darkTheme
}


const userReducer = (state = initialState, action) => {
    switch (action.type){
      case SET_USER_WATCHLIST:
        return {...state, watchedCoins: state.watchedCoins.concat([action.payload])};
      case REMOVE_USER_WATCHLIST:
        return {...state,watchedCoins: state.watchedCoins.filter(item => item.symbol !== action.payload.symbol)};
      case ADD_PAGE_HISTORY:
        return {...state, pageHistory:action.payload}
      case ADD_ALL_COIN:
        return {...state, allCoins:action.payload}
      case SWITCH_THEME:
        return {...state,theme:action.payload}
      default:
        return state;
    }

}

export default userReducer;

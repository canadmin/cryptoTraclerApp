import {SET_USER_WATCHLIST,REMOVE_USER_WATCHLIST,ADD_PAGE_HISTORY} from "./action";


const initialState = {
   watchedCoins : [],
   pageHistory : '', // geri dönme butonunda tutulacak olan stack
   activePortfolio: 0 // portfolio sayfasında gösterilecek olan porföy
}


const userReducer = (state = initialState, action) => {
    switch (action.type){
      case SET_USER_WATCHLIST:
        return {...state, watchedCoins: state.watchedCoins.concat([action.payload])};
      case REMOVE_USER_WATCHLIST:
        return {...state,watchedCoins: state.watchedCoins.filter(item => item.symbol !== action.payload.symbol)};
      case ADD_PAGE_HISTORY:
        return {...state, pageHistory:action.payload}
      default:
        return state;
    }

}

export default userReducer;

export const SET_USER_WATCHLIST = 'SET_USER_WATCHLIST';
export const REMOVE_USER_WATCHLIST = 'REMOVE_USER_WATCHLIST';
export const ADD_PAGE_HISTORY = "ADD_PAGE_HISTORY"
export const ADD_ALL_COIN = "ADD_ALL_COIN"

export const addWatchList = coin => dispatch => {
  dispatch({
    type: SET_USER_WATCHLIST,
    payload : coin,
  })
}

export const removeWatchList = coin => dispatch => {
  dispatch({
    type: REMOVE_USER_WATCHLIST,
    payload : coin,
  })
}


export const addAllCoins = coins => dispatch => {
  dispatch({
    type: ADD_ALL_COIN,
    payload : coins,
  })
}


export const addPageHistory = route => dispatch => {
  dispatch({
    type: ADD_PAGE_HISTORY,
    payload : route,
  })
}



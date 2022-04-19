export const SET_USER_WATCHLIST = 'SET_USER_WATCHLIST';
export const REMOVE_USER_WATCHLIST = 'REMOVE_USER_WATCHLIST';

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

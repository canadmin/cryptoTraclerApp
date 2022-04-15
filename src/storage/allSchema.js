import Realm from "realm";
import rejectionTrackingOptions from "react-native/Libraries/promiseRejectionTrackingOptions";

export const WATCHLIST_SCHEMA = "Watchlist";
export const PORTFOLIO_SCHEMA = "Portfolio";

export const WatchListSchema = {
  name: WATCHLIST_SCHEMA,
  primaryKey: "symbol",
  properties: {
    symbol: "string",
    name: { type: "string", indexed: true },
  },
};

const dataBaseOptions = {
  path: "cryptoTrackerApp.realm",
  schema: [WatchListSchema],
  schemaVersion: 0,
};

export const insertFavorites = coin => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      realm.create(WATCHLIST_SCHEMA, coin);
      resolve(coin);
    });
  }).catch((error => reject(error)));
});


export const deleteFavorites = coinId => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      let deletingCoin = realm.objectForPrimaryKey(WATCHLIST_SCHEMA, coinId);
      console.log(deletingCoin);
      realm.delete(deletingCoin);
      resolve();
    });
  });
});

export const getAllFavorites = () => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    let allFavorites = realm.objects(WATCHLIST_SCHEMA);
    resolve(allFavorites);
  }).catch(err => {
    reject(err);
  });
});

export const deleteAll = () => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {
      let coins = realm.objects(WATCHLIST_SCHEMA);
      realm.delete(coins);
      resolve();
    });
  }).catch(err => {
    reject(err);
  });
});


export default new Realm(dataBaseOptions);

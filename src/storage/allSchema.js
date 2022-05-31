import Realm from "realm";
export const WATCHLIST_SCHEMA = "Watchlist";
export const PORTFOLIO_SCHEMA = "Portfolio";
export const PORTFOLIO_ASSETS_SCHEMA = "PortfolioAssets";

export const PortfolioAssetsSchema = { // portflio1: 20 bitcoin, 2022 tarihinde eklendi
  name: PORTFOLIO_ASSETS_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int",//porfolio+sembol ile id oluşturalacak bu yüzden unique olmalı
    portfolioId: "int",
    amount:'string', // 20 tane btc
    price:'string', // 34 500 dolardan
    isAddTransaction:'bool', // true aldı
    createDate:'date',//date.now
    transactionDate: 'date',
    symbol:'string',
    name:'string',
    coinId:'int',
    assetColor:'string'
  },
};

export const PortfolioSchema = { // porfolio_1,sheetcoinlerim
  name: PORTFOLIO_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int",
    name: { type: "string", indexed: true },
    color: "string"
  },

};



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
  schema: [WatchListSchema,PortfolioAssetsSchema,PortfolioSchema],
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



//portfolio
export const createPortfolio = portfolio => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    const results = realm.objects(PORTFOLIO_SCHEMA).sorted('id');
    const id = results.length > 0 ? results[results.length - 1].id + 1 : 1;
    realm.write(() => {
      realm.create(PORTFOLIO_SCHEMA, { ...portfolio,id });
      resolve({...portfolio,id});
    });
  }).catch((error => reject(error)));
});

export const getAllPortfolio = () => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    let allPortfolio = realm.objects(PORTFOLIO_SCHEMA);
    resolve(allPortfolio);
  }).catch(err => {
    reject(err);
  });
});



// porfolio assets
export const addAssetToPortfolio = (asset) => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    console.log("aaa",asset)
    if(asset.id){
      const result = realm.objects(PORTFOLIO_ASSETS_SCHEMA).filtered("id =="+asset.id)[0];
    console.log(result)
      realm.write(() => {
        Object.assign(result, asset)
      });
    }else {
      const results = realm.objects(PORTFOLIO_ASSETS_SCHEMA).sorted('id');
      const id = results.length > 0 ? results[results.length - 1].id + 1 : 1;
      realm.write(() => {
        realm.create(PORTFOLIO_ASSETS_SCHEMA, { ...asset,id });
        resolve(asset);
      });
    }

  }).catch((error => reject(error)));
});


export const getAssetsByPortfolio = (portfolioId) => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    let assets = realm.objects(PORTFOLIO_ASSETS_SCHEMA).filtered("portfolioId ="+portfolioId+"");
    resolve(assets)
  }).catch((error => reject(error)));
});

export const deleteAllTransaction = (coinId,portfolioId) => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    realm.write(() => {

      let transactions = realm.objects(PORTFOLIO_ASSETS_SCHEMA).filtered(`portfolioId ==`+portfolioId+" AND coinId =="+coinId);
     realm.delete(transactions);
      resolve();
    });
  });
});

export const getAssetTransactionDetail = (portfolioId,coinId) => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    let assets = realm.objects(PORTFOLIO_ASSETS_SCHEMA).filtered(`portfolioId ==`+portfolioId+" AND coinId =="+coinId);
    resolve(assets)
  }).catch((error => reject(error)));
});

export const getTransaction = (id) => new Promise((resolve, reject) => {
  Realm.open(dataBaseOptions).then(realm => {
    let assets = realm.objects(PORTFOLIO_ASSETS_SCHEMA).filtered(`id ==`+id);
    resolve(assets)
  }).catch((error => reject(error)));
});


export default new Realm(dataBaseOptions);

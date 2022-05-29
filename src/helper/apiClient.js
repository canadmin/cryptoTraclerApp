import axios from "axios";
const  {REACT_APP_CRYPTO_API_URL} = process.env;


export const request = (options) => {
  let url = options.params
    ? `${"http://68.183.68.105:4000/"}${options.path}?`
    : `${"http://68.183.68.105:4000/"}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  try {
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }

};

export const externalApirequest = (options) => {
  let url = options.params
    ? `${"https://data.gateapi.io/api2/1/ticker/"}${options.path}?`
    : `${"https://data.gateapi.io/api2/1/ticker/"}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  try{
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }

};


export const getOhlcHistoryRequest = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/coins/"+options.currency_name_id+"/ohlc?vs_currency=usd&days="}${options.path}`

  try{
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e) {
    return e;
  }

};


export const getHistoryPriceFromExternal = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/coins/"+options.currency_name_id+"/history?date="}${options.path}`
  try {
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }
};

export const getGlobal = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/global"}`;
  try {
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }
};

export const getTrending = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/search/trending"}`;
  try {
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }
};


export const getTrendingPrice = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/simple/price?ids="+options.ids+"&vs_currencies=usd"}`;
  try {
    return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
  }catch (e){
    return e;
  }
};

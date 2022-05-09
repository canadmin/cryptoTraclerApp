import axios from "axios";
const  {REACT_APP_CRYPTO_API_URL} = process.env;


export const request = (options) => {
  let url = options.params
    ? `${"http://3.67.172.12:4000/"}${options.path}?`
    : `${"http://3.67.172.12:4000/"}${options.path}`;
  if (options.params && options.params.length) {
    options.params.map((par, index) => {
      return (url += par + "=" + options.values[index] + "&");
    });
  }
  return axios({
      method: options.method,
      url: url,
      data: options.data,
    })
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
  return axios({
    method: options.method,
    url: url,
    data: options.data,
  })
};


//
export const getOhlcHistoryRequest = (options) => {
  let url = `${"https://api.coingecko.com/api/v3/coins/"+options.currency_name_id+"/ohlc?vs_currency=usd&days="}${options.path}`

  return axios({
    method: options.method,
    url: url,
    data: options.data,
  })
};


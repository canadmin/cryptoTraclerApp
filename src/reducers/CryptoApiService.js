import { request,externalApirequest,getOhlcHistoryRequest } from "../helper/apiClient";

// top 10 falan
export const getCurrencies = (listType) => {
  const options = {
    method: "get",
    path: "currencies",
    params: ["listType"],
    values:[listType]
  };

  return request(options);
}
export const getImage = (symbol) => {
  const options = {
    method: "get",
    path: "getImage",
    params: ["symbol"],
    values:[symbol]
  };
  return request(options);
}

// sadece bitoin veya eth,shib
export const getCryptoInfo = (symbol) => {
  const options = {
    method: "get",
    path: "cryptoInfo",
    params: ["symbol"],
    values:[symbol]
  };
  return request(options);
}

//crypto compare tekli değer
export const getCurrencyPrice = (symbol) => {
  const options = {
    method: "get",
    path: "currency",
    params: ["symbol"],
    values:[symbol]
  };
  return request(options);
}

export const getOhlcData = (currency_name_id,days) => {
  const options = {
    method: "get",
    params: ["days","vs_currency"],
    values:[days,"usd"],
    currency_name_id:currency_name_id

  };
  return request(options);
}

export const getCurrenciesFromExtarnalApi = (symbol) => {
  const options = {
    method: "get",
    path: symbol.toLowerCase()+"_usdt",
  };
  return externalApirequest(options);
}


export const getChartValue = (currency_id,period) => {

  const options = {
    method: "get",
    path:period,
    currency_name_id:currency_id
  }

  return getOhlcHistoryRequest(options)
}



export default {
  getCurrencies,getCurrenciesFromExtarnalApi,getCryptoInfo,getImage
};

import { request,externalApirequest } from "../helper/apiClient";

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

// sadece bitoin

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

export const getCurrenciesFromExtarnalApi = (symbol) => {
  const options = {
    method: "get",
    path: symbol.toLowerCase()+"_usdt",
  };

  return externalApirequest(options);
}




export default {
  getCurrencies,getCurrenciesFromExtarnalApi
};

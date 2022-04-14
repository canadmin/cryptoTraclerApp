import axios from "axios";
const  {REACT_APP_CRYPTO_API_URL} = process.env;


export const request = (options) => {
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
    responseType: options.responseType,
    headers: options.headers,
  })
    .then((response) => {
    })
    .catch((error) => {
      console.log(error.response);
    });
};

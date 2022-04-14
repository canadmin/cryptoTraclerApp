import axios from "axios";
const  {REACT_APP_CRYPTO_API_URL} = process.env;


export const request = (options) => {
  let url = options.params
    ? `${"http://localhost:4000/"}${options.path}?`
    : `${"http://localhost:4000/"}${options.path}`;
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

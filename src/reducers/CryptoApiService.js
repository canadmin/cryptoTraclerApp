import { request } from "../helper/apiClient";

export const getCurrencies = (listType) => {
  const options = {
    method: "get",
    path: "currencies",
    params: ["listType"],
    values:[listType]
  };

  return request(options);
}

export default {
  getCurrencies
};

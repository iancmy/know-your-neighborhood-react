import axios from "axios";

class StoreService {
  #API_BASE_URI = "http://localhost:8080";
  #API_URI = `${this.#API_BASE_URI}/api/public/store`;
  #API_PRIVATE_URI = `${this.#API_BASE_URI}/api/store`;

  constructor() {}

  getStores = () => {
    return axios.get(`${this.#API_URI}/all`);
  };

  getStore = ({ storeId, query }) => {
    return axios.get(
      `${this.#API_URI}${storeId ? `/${storeId}` : `?query=${query}`}`
    );
  };

  createStore = async ({ storeName, location }) => {
    return axios.post(
      `${this.#API_PRIVATE_URI}`,
      {
        storeName,
        location,
      },
      {
        withCredentials: true,
      }
    );
  };

  updateStore = async ({ storeId, storeName, location }) => {
    return axios.put(
      `${this.#API_PRIVATE_URI}/${storeId}`,
      {
        storeName,
        location,
      },
      {
        withCredentials: true,
      }
    );
  };

  deleteStore = async ({ storeId }) => {
    return axios.delete(`${this.#API_PRIVATE_URI}/${storeId}`, {
      withCredentials: true,
    });
  };
}

export default new StoreService();

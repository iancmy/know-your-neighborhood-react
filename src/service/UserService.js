import axios from "axios";

class UserService {
  #API_BASE_URI = "http://localhost:8080";
  #API_URI = `${this.#API_BASE_URI}/api/public/user`;
  #API_PRIVATE_URI = `${this.#API_BASE_URI}/api/user`;

  constructor() {}

  getAccount = () => {
    return axios.get(`${this.#API_PRIVATE_URI}/account`, {
      withCredentials: true,
    });
  };

  updateAccount = async ({
    firstName,
    lastName,
    contactNumber,
    emailAddress,
    username,
    password,
  }) => {
    return axios.put(
      `${this.#API_PRIVATE_URI}/account`,
      {
        firstName,
        lastName,
        contactNumber,
        emailAddress,
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
  };

  login = ({ username, emailAddress, password }) => {
    return axios.post(
      `${this.#API_URI}/login`,
      {
        emailAddress,
        username,
        password,
      },
      { withCredentials: true }
    );
  };

  logout = () => {
    return axios.post(
      `${this.#API_PRIVATE_URI}/logout`,
      {},
      {
        withCredentials: true,
      }
    );
  };

  signup = ({
    firstName,
    lastName,
    contactNumber,
    emailAddress,
    username,
    password,
  }) => {
    return axios.post(
      `${this.#API_URI}/signup`,
      {
        firstName,
        lastName,
        contactNumber,
        emailAddress,
        username,
        password,
      },
      { withCredentials: true }
    );
  };
}

export default new UserService();

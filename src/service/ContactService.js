import axios from "axios";

class ContactService {
  #API_URI = "http://localhost:8080/api/public/contact/";

  constructor() {}

  sendMessage(data) {
    return axios.post(this.#API_URI, data);
  }
}

export default new ContactService();

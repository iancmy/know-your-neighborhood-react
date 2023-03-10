import axios from "axios";

class AuthService {
  #AUTH_URI = "http://localhost:8080/api/user/auth";
  #BASE_URI = "http://localhost:8080/oauth2/authorize";
  #REDIRECT_URI = "http://127.0.0.1:5173/oauth2/redirect";

  constructor() {}

  #openAuthWindow(service) {
    const authWindow = window.open(
      `${this.#BASE_URI}/${service}?redirect_uri=${this.#REDIRECT_URI}`,
      "_blank",
      "width=500,height=600"
    );

    return authWindow;
  }

  authorize(service) {
    return new Promise((resolve, reject) => {
      const authWindow = this.#openAuthWindow(service);

      const intervalId = setInterval(() => {
        if (!authWindow) {
          clearInterval(intervalId);
          resolve({
            success: false,
            message: "Authorization window not found!",
            token: null,
          });
        }

        try {
          // Check if window has been closed
          if (authWindow.closed) {
            clearInterval(intervalId);
            resolve({
              success: false,
              message: "Authorization window have been closed!",
              token: null,
            });
          }

          // Get token from url
          const searchParams = new URLSearchParams(authWindow.location.search);
          const token = searchParams.get("token");

          if (token) {
            clearInterval(intervalId);
            // Close window
            setTimeout(() => {
              authWindow.close();
            }, 5000);

            // Resolve with token
            resolve({
              success: true,
              message: "Authorization successful!",
              token,
            });
          }
        } catch (e) {
          console.error("Waiting for the access token...");
          console.error(e);
        }
      }, 1000); // Check every second
    });
  }

  authenticate(token) {
    return axios.post(
      `${this.#AUTH_URI}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
  }
}

export default new AuthService();

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebFont from "webfontloader";
import "./App.css";

import UserService from "./service/UserService";

import Header from "./pages/partials/Header";
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from "./pages/About";
import Contact from "./pages/Contact";
import StoreDetails from "./pages/StoreDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Thankyou from "./pages/Thankyou";
import Account from "./pages/Account";
import Redirect from "./pages/Redirect";
import ToastContainer from "./components/ToastContainer";
import ToastProps from "./model/ToastProps";
import Privacy from "./pages/Privacy";

export default function App() {
  const [loginStatus, setLoginStatus] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const getAccount = async () => {
    try {
      const { data } = await UserService.getAccount();

      setUserDetails(data);

      if (!loginStatus) {
        setLoginStatus(true);
      }
    } catch (e) {
      const { message } = e.response.data;

      if (loginStatus) {
        setLoginStatus(false);
        setToasts((toasts) => [
          ...toasts,
          new ToastProps({ message, type: "error" }),
        ]);
      }
    }
  };

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Josefin Sans"],
      },
    });

    getAccount();
  }, []);

  useEffect(() => {
    if (loginStatus) {
      getAccount();
    }
  }, [loginStatus]);

  return (
    <div data-theme="kyn">
      <Router>
        <Header
          loginStatus={loginStatus}
          setLoginStatus={setLoginStatus}
          setToasts={setToasts}
          userDetails={userDetails}
          setUserDetails={setUserDetails}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/store/:id" element={<StoreDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact setToasts={setToasts} />} />
          <Route
            path="/login"
            element={
              <Login
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
                setToasts={setToasts}
              />
            }
          />
          <Route
            path="/signup"
            element={
              <Signup
                loginStatus={loginStatus}
                setLoginStatus={setLoginStatus}
              />
            }
          />
          <Route path="/thankyou" element={<Thankyou />} />
          <Route
            path="/account"
            element={
              <Account
                userDetails={userDetails}
                loginStatus={loginStatus}
                setToasts={setToasts}
                setUserDetails={setUserDetails}
              />
            }
          />
          <Route path="/oauth2/redirect" element={<Redirect />} />
          <Route path="/privacy" element={<Privacy />} />
        </Routes>
        <ToastContainer toasts={toasts} />
      </Router>
    </div>
  );
}

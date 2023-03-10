import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import UserService from "../service/UserService";
import AuthService from "../service/AuthService";

import { Input, Button } from "@material-tailwind/react";
import PuffLoader from "react-spinners/PuffLoader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";

import loginBg from "../assets/login.jpg";
import FormAlert from "../components/FormAlert";
import ToastProps from "../model/ToastProps";
import FormInput from "../components/FormInput";
import ValidationProp from "../model/ValidationProp";

export default function Login({ loginStatus, setLoginStatus, setToasts }) {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const [alert, setAlert] = useState({
    message: "No error.",
    type: "info",
  });

  const emailValidation = new ValidationProp({ name: "Email Address" });
  emailValidation.setRequired({
    message: "Email address or username is required!",
  });
  emailValidation.setPattern({
    regex: new RegExp(
      "^(?:[A-Zd][A-Zd_-]{5,}|[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4})$",
      "i"
    ),
    message: "Email address or username is invalid!",
  });

  const passwordValidation = new ValidationProp({ name: "Password" });
  passwordValidation.setRequired({
    message: "Password is required!",
  });

  useEffect(() => {
    if (loginStatus) {
      navigate("/account");
    }
  }, [loginStatus]);

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);

    const usernameRegex = new RegExp("^[A-Zd][A-Zd_-]{5,10}", "i");

    const emailAddress = e.target.emailAddress.value;
    const password = e.target.password.value;

    if (!emailValidation.validate(emailAddress).valid) {
      setAlert({
        message: emailValidation.validate(emailAddress).message,
        type: "error",
      });

      setShowAlert(true);
      setLoading(false);
      return;
    }

    if (!passwordValidation.validate(password).valid) {
      setAlert({
        message: passwordValidation.validate(password).message,
        type: "error",
      });

      setShowAlert(true);
      setLoading(false);
      return;
    }

    try {
      if (usernameRegex.test(emailAddress)) {
        const username = emailAddress;
        const {
          data: { accessToken },
        } = await UserService.login({ username, password });

        if (accessToken) {
          const { data } = await AuthService.authenticate(accessToken);

          if (data.successful) {
            setToasts((prev) => [
              ...prev,
              new ToastProps({ message: "Log in successful!" }),
            ]);

            setLoading(false);
            setLoginStatus(true);
          }
        }

        return;
      }

      const {
        data: { accessToken },
      } = await UserService.login({ emailAddress, password });

      if (accessToken) {
        const { data } = await AuthService.authenticate(accessToken);

        if (data.successful) {
          setToasts((prev) => [
            ...prev,
            new ToastProps({ message: "Log in successful!" }),
          ]);

          setLoading(false);
          setLoginStatus(true);
        }
      }
    } catch (e) {
      setAlert({
        message:
          "Wrong credentials! Please make sure your email/username and password are correct.",
        type: "error",
      });

      setShowAlert(true);
      setLoading(false);
    }
  }

  async function handleSocialLogin(e) {
    e.preventDefault();
    setLoading(true);

    const { success, message, token } = await AuthService.authorize(
      e.target.name
    );

    if (success) {
      const { data } = await AuthService.authenticate(token);

      if (data.successful) {
        setToasts((prev) => [
          ...prev,
          new ToastProps({ message: "Log in successful!" }),
        ]);

        setLoading(false);
        setLoginStatus(true);
      }
    } else {
      setToasts((prev) => [
        ...prev,
        new ToastProps({ message: `Login failed! ${message}`, type: "error" }),
      ]);

      setLoading(false);
      setLoginStatus(false);
    }
  }

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${loginBg})` }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
        <div className="hero-content text-center my-32">
          <div className="max-w-full flex flex-col gap-4 border border-primary p-8 rounded-2xl bg-white bg-opacity-50">
            <h1 className="text-5xl font-bold">Log in</h1>
            <div
              className={`${
                loading ? "flex" : "hidden"
              } flex-col items-center justify-center gap-2 my-2 `}
            >
              <p className="font-bold text-lg">
                Logging you in, please wait...
              </p>
              <PuffLoader color="#4F6BB7" />
            </div>
            <form
              className={`${
                loading ? "hidden" : "flex"
              } flex flex-col gap-4 w-72 lg:w-96`}
              onSubmit={handleLogin}
            >
              <FormInput
                size="lg"
                label="Email address or username"
                color="deep-purple"
                variant="standard"
                name="emailAddress"
                validation={emailValidation}
              />
              <FormInput
                size="lg"
                label="Password"
                color="deep-purple"
                variant="standard"
                type={"password"}
                name="password"
                validation={passwordValidation}
              />
              <Button
                fullWidth
                variant="gradient"
                type="submit"
                color="deep-purple"
              >
                Log in
              </Button>
              <FormAlert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={alert.message}
                type={alert.type}
              />
            </form>
            <div className={`${loading ? "hidden" : "flex"} flex-col gap-4`}>
              <div className="divider text-primary">OR</div>
              <Button
                fullWidth
                variant="outlined"
                color="red"
                ripple={true}
                name="google"
                onClick={handleSocialLogin}
              >
                <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Continue
                with Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                color="indigo"
                ripple={true}
                name="facebook"
                onClick={handleSocialLogin}
              >
                <FontAwesomeIcon icon={faFacebookF} className="mr-2" /> Continue
                with Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

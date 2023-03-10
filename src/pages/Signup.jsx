import { useRef, useState } from "react";

import signupBg from "../assets/signup.jpg";
import FormAlert from "../components/FormAlert";

import { Button } from "@material-tailwind/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import FormInput from "../components/FormInput";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";
import ValidationProp from "../model/ValidationProp";

export default function Signup() {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [alert, setAlert] = useState({
    message: "No error.",
    type: "info",
  });
  const passwordRef = useRef();

  const firstNameValidation = new ValidationProp({ name: "First Name" });
  firstNameValidation.setRequired({
    message: "First name is required!",
  });

  const lastNameValidation = new ValidationProp({ name: "Last Name" });
  lastNameValidation.setRequired({
    message: "Last name is required!",
  });

  const contactNumberValidation = new ValidationProp({
    name: "Contact Number",
  });

  const emailAddressValidation = new ValidationProp({
    name: "Email Address",
  });
  emailAddressValidation.setRequired({
    message: "Email address is required!",
  });
  emailAddressValidation.setPattern({
    regex: new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$",
      "i"
    ),
    message: "Email address is invalid!",
  });

  const usernameValidation = new ValidationProp({ name: "Username" });
  usernameValidation.setRequired({
    message: "Username is required!",
  });
  usernameValidation.setPattern({
    regex: new RegExp("^[A-Zd][A-Zd_-]{5,10}", "i"),
    message: "Username is invalid!",
  });

  const passwordValidation = new ValidationProp({ name: "Password" });
  passwordValidation.setRequired({
    message: "Password is required!",
  });
  passwordValidation.setMinLength({
    length: 8,
    message: "Password must be at least 8 characters!",
  });

  const confirmPasswordValidation = new ValidationProp({
    name: "Confirm Password",
  });
  confirmPasswordValidation.setRequired({
    message: "Confirm password is required!",
  });
  confirmPasswordValidation.addCustomRule({
    message: "Passwords do not match!",
    callback: (value) => {
      return value === passwordRef.current.value;
    },
  });

  async function handleSignup(e) {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const contactNumber = e.target.contactNumber.value;
    const emailAddress = e.target.emailAddress.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Validate
    if (
      !firstNameValidation.validate(firstName) ||
      !lastNameValidation.validate(lastName) ||
      !contactNumberValidation.validate(contactNumber) ||
      !emailAddressValidation.validate(emailAddress) ||
      !usernameValidation.validate(username) ||
      !passwordValidation.validate(password) ||
      !confirmPasswordValidation.validate(confirmPassword)
    ) {
      setAlert({
        type: "error",
        message: "Please fill up the form correctly!",
      });

      setShowAlert(true);

      return;
    }

    try {
      const { data } = await UserService.signup({
        firstName,
        lastName,
        contactNumber,
        emailAddress,
        username,
        password,
      });

      if (data.success) {
        navigate("/thankyou");
      }
    } catch (e) {
      const { data } = e.response;

      setAlert({
        type: "error",
        message: data.error,
      });

      setShowAlert(true);
    }
  }

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
        <div className="hero-content text-center my-32">
          <div className="max-w-full flex flex-col gap-4 border border-primary p-8 rounded-2xl bg-white bg-opacity-50">
            <h1 className="text-5xl font-bold">Sign up</h1>
            <form
              className="flex flex-col gap-4 w-72 lg:w-96"
              onSubmit={handleSignup}
            >
              <FormInput
                size="lg"
                label="First name"
                color="deep-purple"
                variant="standard"
                name="firstName"
                validation={firstNameValidation}
              />
              <FormInput
                size="lg"
                label="Last name"
                color="deep-purple"
                variant="standard"
                name="lastName"
                validation={lastNameValidation}
              />
              <FormInput
                size="lg"
                label="Contact number (optional)"
                color="deep-purple"
                variant="standard"
                name="contactNumber"
                validation={contactNumberValidation}
              />
              <FormInput
                size="lg"
                label="Email address"
                color="deep-purple"
                variant="standard"
                name="emailAddress"
                validation={emailAddressValidation}
              />
              <FormInput
                size="lg"
                label="Username"
                color="deep-purple"
                variant="standard"
                name="username"
                validation={usernameValidation}
              />
              <FormInput
                size="lg"
                label="Password"
                color="deep-purple"
                variant="standard"
                type="password"
                name="password"
                inputRef={passwordRef}
                validation={passwordValidation}
              />
              <FormInput
                size="lg"
                label="Confirm password"
                color="deep-purple"
                variant="standard"
                type="password"
                name="confirmPassword"
                validation={confirmPasswordValidation}
              />
              <Button fullWidth variant="gradient" type="submit" color="green">
                Sign up
              </Button>
              <FormAlert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={alert.message}
                type={alert.type}
              />
            </form>
            <div className="divider text-primary">OR</div>
            <Button fullWidth variant="outlined" color="red" ripple={true}>
              <FontAwesomeIcon icon={faGoogle} className="mr-2" /> Continue with
              Google
            </Button>
            <Button fullWidth variant="outlined" color="indigo" ripple={true}>
              <FontAwesomeIcon icon={faFacebookF} className="mr-2" /> Continue
              with Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

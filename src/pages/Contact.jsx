import contactBg from "../assets/contact.jpg";
import FormInput from "../components/FormInput";
import { Button } from "@material-tailwind/react";
import PuffLoader from "react-spinners/PuffLoader";
import { useState } from "react";
import FormAlert from "../components/FormAlert";
import ContactService from "../service/ContactService";
import ToastProps from "../model/ToastProps";
import ValidationProp from "../model/ValidationProp";

export default function Contact({ setToasts }) {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const fullNameValidation = new ValidationProp({ name: "Full Name" });
  fullNameValidation.setRequired({ message: "Full name is required!" });

  const subjectValidation = new ValidationProp({ name: "Subject" });
  subjectValidation.setRequired({ message: "Subject is required!" });

  const messageValidation = new ValidationProp({ name: "Message" });
  messageValidation.setRequired({ message: "Message is required!" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const subject = e.target.subject.value;
    const message = e.target.message.value;

    // Submit validation
    if (!fullNameValidation.validate(name).valid) {
      setShowAlert(true);
      setAlertMessage(fullNameValidation.validate(name).message);
      return;
    }

    if (!subjectValidation.validate(subject).valid) {
      setShowAlert(true);
      setAlertMessage(subjectValidation.validate(subject).message);
      return;
    }

    if (!messageValidation.validate(message).valid) {
      setShowAlert(true);
      setAlertMessage(messageValidation.validate(message).message);
      return;
    }

    setLoading(true);

    const body = {
      name,
      subject,
      message,
    };

    const { data } = await ContactService.sendMessage(body);

    if (data.success) {
      setToasts((prev) => [...prev, new ToastProps({ message: data.message })]);
    } else {
      setToasts((prev) => [
        ...prev,
        new ToastProps({ message: data.message, type: "error" }),
      ]);
    }

    setLoading(false);
    e.target.reset();
  };

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${contactBg})` }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
        <div className="hero-content text-center my-32">
          <div className="max-w-md flex flex-col gap-4 border border-primary p-8 rounded-2xl bg-white bg-opacity-50">
            <h1 className="text-5xl font-bold">Contact Us!</h1>
            <div
              className={`${
                loading ? "flex" : "hidden"
              } flex-col items-center justify-center gap-2 my-2 `}
            >
              <p className="font-bold text-lg">
                Sending your feedback. Thank you!
              </p>
              <PuffLoader color="#4F6BB7" />
            </div>
            <form
              className={`${
                loading ? "hidden" : "flex"
              } flex flex-col gap-4 w-72 lg:w-96`}
              onSubmit={handleSubmit}
            >
              <h2 className="text-sm">
                Please use the form below if you have any questions, comments,
                or suggestions. Your feedback is highly valued, and we strive to
                provide you with excellent service. Thank you for reaching out
                to us.
              </h2>
              <FormInput
                size="lg"
                label="Full name"
                color="deep-purple"
                variant="standard"
                name="name"
                validation={fullNameValidation}
              />
              <FormInput
                size="lg"
                label="Subject"
                color="deep-purple"
                variant="standard"
                name="subject"
                validation={subjectValidation}
              />
              <FormInput
                size="lg"
                label="Message"
                color="deep-purple"
                variant="standard"
                name="message"
                type="textarea"
                validation={messageValidation}
              />
              <Button
                fullWidth
                variant="gradient"
                type="submit"
                color="deep-purple"
              >
                Submit
              </Button>
              <FormAlert
                showAlert={showAlert}
                setShowAlert={setShowAlert}
                message={alertMessage}
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

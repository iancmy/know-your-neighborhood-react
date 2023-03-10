import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function FormAlert({
  message = "",
  type = "error",
  showAlert,
  setShowAlert,
}) {
  const [active, setActive] = useState(false);

  const alert = {
    success: {
      color: "green",
      icon: <FontAwesomeIcon icon={faCheckCircle} />,
    },
    error: {
      color: "red",
      icon: <FontAwesomeIcon icon={faXmarkCircle} />,
    },
    info: {
      color: "blue",
      icon: <FontAwesomeIcon icon={faInfoCircle} />,
    },
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [setShowAlert, active]);

  useEffect(() => {
    if (showAlert) {
      setActive(true);
    } else {
      setActive(false);
    }
  }, [showAlert]);

  return (
    <Alert
      variant="gradient"
      show={showAlert}
      animate={{
        mount: { y: 0 },
        unmount: { y: 50 },
      }}
      color={alert[type]?.color}
      icon={alert[type]?.icon}
      className="font-bold text-left"
    >
      {message}
    </Alert>
  );
}

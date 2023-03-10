import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faXmarkCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@material-tailwind/react";
import { useState, useEffect } from "react";

export default function Toast({ type, message }) {
  const [active, setActive] = useState(true);

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
    setTimeout(() => setActive(false), 5000);
  }, []);

  return (
    <Alert
      variant="gradient"
      show={active}
      animate={{
        mount: { x: 0 },
        unmount: { x: 250 },
      }}
      color={alert[type]?.color}
      icon={alert[type]?.icon}
      dismissible={{
        onClose: () => setActive(false),
      }}
    >
      {message}
    </Alert>
  );
}

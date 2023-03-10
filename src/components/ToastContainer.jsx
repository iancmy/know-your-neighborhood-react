import { useState, useEffect } from "react";
import Toast from "./Toast";

export default function ToastContainer({ toasts }) {
  const [alert, setAlert] = useState();

  useEffect(() => {
    setAlert(
      toasts.map(({ type, message }, i) => (
        <Toast type={type} message={message} key={i} />
      ))
    );
  }, [toasts]);

  return (
    <div className="flex flex-col gap-4 font-bold text-left fixed bottom-1 right-1 z-40">
      {alert}
    </div>
  );
}

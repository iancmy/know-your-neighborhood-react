import { useEffect, useState } from "react";

import redirectBg from "../assets/redirect.jpg";

export default function Redirect() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = count > 0 && setInterval(() => setCount(count - 1), 1000);

    return () => clearInterval(timer);
  }, [count]);

  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${redirectBg})` }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
        <div className="hero-content text-center my-32">
          <div className="max-w-full flex flex-col gap-4 border border-primary p-8 rounded-2xl bg-white bg-opacity-50">
            <h1 className="text-5xl font-bold">Successfully logged in!</h1>
            <h2 className="text-xl">
              Thank you for using our service! You will be redirected to your
              account page in {count}...
            </h2>
            <h3>
              You can close this window manually by clicking the button below.
            </h3>

            <button
              className="btn btn-primary"
              onClick={() => {
                window.close();
              }}
            >
              Close window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from "react";
import "./css/PageTitle.css";

export default function PageTitle({ title }) {
  const titleRef = useRef(null);

  useEffect(() => {
    titleRef.current.classList.add("animated-title");
  }, []);

  return (
    <div>
      <div
        ref={titleRef}
        className="hero h-48 rounded-2xl bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-800 via-indigo-500 to-indigo-300"
      >
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold mt-16 text-accent-focus drop-shadow-2xl">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

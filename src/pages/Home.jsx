import { Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import hero from "../assets/hero.jpg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      className="home hero min-h-screen max-w-full rounded-2xl"
      style={{
        backgroundImage: `url(${hero})`,
      }}
    >
      <div className="hero-overlay bg-opacity-40 rounded-xl"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-xl">
          <h1 className="mb-5 text-5xl font-bold text-neutral-content">
            <p>
              Know Your <span className="text-primary">Neighborhood.</span>
            </p>
            <p>
              Know Your <span className="text-primary">Stores.</span>
            </p>
          </h1>
          <p className="mb-5 text-xl">
            Explore local businesses, restaurants, and shops in your
            neighborhood with our easy-to-use website.
          </p>
          <div className="flex gap-2 justify-center">
            <Button
              variant="gradient"
              size="lg"
              color="green"
              className="hidden lg:inline-block"
              onClick={() => navigate("/signup")}
            >
              <span>Sign up</span>
            </Button>
            <Button
              variant="gradient"
              size="lg"
              color="deep-purple"
              className="hidden lg:inline-block"
              onClick={() => navigate("/login")}
            >
              <span>Log in</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from "react-router-dom";
import signupBg from "../assets/signup.jpg";

export default function Thankyou() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url(${signupBg})` }}
      >
        <div className="hero-overlay bg-opacity-50 rounded-xl"></div>
        <div className="hero-content text-center my-32">
          <div className="max-w-full flex flex-col gap-4 border border-primary p-8 rounded-2xl bg-white bg-opacity-50">
            <h1 className="text-5xl font-bold">Thank you for signing up!</h1>
            <p className="text-xl">
              Click the button below to login to your account.
            </p>
            <Link to="/login">
              <button className="btn btn-primary">Login</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

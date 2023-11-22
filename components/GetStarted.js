import React from "react";
import { useNavigate } from "react-router-dom";
import "./GetStarted.css";

const GetStarted = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="gs-content">
        <h1 className="gs-h1">
          Welcome to the only <b>Personal Scheduler</b> you'll ever need.
        </h1>
        <h2 className="gs-h2">Let's Get Started!</h2>
        <div className="button-container">
          <button className="login-button" onClick={handleLogin}>
            Login!
          </button>
          <button className="signup-button" onClick={handleSignUp}>
            Sign Up!
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

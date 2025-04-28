

import React, { useState } from 'react';
import "../styles/Login.scss";
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");  // To show error message

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://147.93.27.170:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const loggedIn = await response.json();

      if (response.status === 200) {
        // If login is successful
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
          })
        );
        navigate("/"); // Redirect to Home after successful login
      } else {
        // If login failed, show error message
        setError(loggedIn.message || "Login failed. Please try again.");

        // Clear the error message after 2 seconds
        setTimeout(() => {
          setError("");  // Reset error message
        }, 2000);
      }
    } catch (err) {
      console.log("Login failed", err.message);
      setError("Login failed. Please try again.");

      // Clear the error message after 2 seconds
      setTimeout(() => {
        setError("");  // Reset error message
      }, 2000);
    }
  };

  return (
    <div className="login">
      <div className="login_content">
        <h1>Login</h1>
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">LOG IN</button>
        </form>
        {error && <p className="error">{error}</p>} {/* Display error message below the form */}
        <p> Logged out? Switch details here</p>
      
      </div>
    </div>
  );
};

export default LoginPage;






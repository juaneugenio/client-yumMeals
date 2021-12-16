import React, { useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import * as PATHS from "../utils/paths.js";
import * as USER_HELPERS from "../utils/userToken";

import "./LogIn.css";

export default function LogIn({ authenticate }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const { email, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      email,
      password,
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOME_PAGE);
    });
  }
  return (
    <div>
      <img
        className="food-image"
        src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
        alt="Enjoying dinner"
      />
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form onSubmit={handleFormSubmission} className="form-login">
        <h2>Welcome</h2>
        <label htmlFor="input-email" className="label-login">
          <h6>Email</h6>
        </label>
        <input
          className="input-login"
          id="input-email"
          type="text"
          name="email"
          placeholder="Here your email"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="input-password" className="label-login">
          <h6>Password</h6>
        </label>
        <input
          className="input-login"
          id="input-password"
          type="password"
          name="password"
          placeholder="Here your password"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>{error.message}. Please, put the correct credentials</p>
          </div>
        )}

        <button className="button-login" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

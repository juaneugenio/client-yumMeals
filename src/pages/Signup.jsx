import React, { useState } from "react";
import { signup } from "../services/auth";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import * as PATHS from "../utils/paths";
import * as USER_HELPERS from "../utils/userToken";

export default function Signup({ authenticate }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { username, password, email } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
      email,
    };
    signup(credentials).then((res) => {
      if (!res.status) {
        // unsuccessful signup
        console.error("Signup was unsuccessful: ", res);
        return setError({
          message: "Signup was unsuccessful!",
        });
      }
      // successful signup
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate(PATHS.HOME_PAGE);
    });
  }

  return (
    <div>
      <img
        src="https://images.unsplash.com/reserve/EnF7DhHROS8OMEp2pCkx_Dufer%20food%20overhead%20hig%20res.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2078&q=80"
        alt="background signup form"
      />
      <form onSubmit={handleFormSubmission} className="form-signup">
        <h2>Sign Up</h2>
        <label className="label-signup" htmlFor="input-username">
          Username
        </label>
        <input
          className="input-signup"
          id="input-username"
          type="text"
          name="username"
          placeholder="Here your username"
          value={username}
          onChange={handleInputChange}
          required
        />

        <label className="label-signup" htmlFor="input-password">
          E-mail
        </label>
        <input
          className="input-signup"
          id="input-email"
          type="email"
          name="email"
          placeholder="john@doe.com"
          value={email}
          onChange={handleInputChange}
          required
        />

        <label className="label-signup" htmlFor="input-password">
          Password
        </label>
        <input
          className="input-signup"
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
          <div className="error-signup">
            <p>{error.message} Please, check if all fields are correct.</p>
          </div>
        )}
        <button className="button-signup" type="submit">
          Signup
        </button>
      </form>
    </div>
  );
}

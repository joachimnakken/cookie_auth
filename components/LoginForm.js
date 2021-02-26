import React, { useState } from "react";
import { loginUser } from "../lib/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const _setEmailValue = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const _setPasswordValue = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const _hanleSubmit = (e) => {
    e.preventDefault();
    console.log("loginCredentials:", { email, password });
    loginUser(email, password);
  };

  console.log({ email, password });
  return (
    <form onSubmit={_hanleSubmit}>
      <div>
        <input
          type="email"
          name="Email"
          placeholder="email"
          onChange={(e) => _setEmailValue(e)}
        ></input>
      </div>
      <div>
        <input
          type="password"
          name="Password"
          placeholder="password"
          onChange={(e) => _setPasswordValue(e)}
        ></input>
      </div>
      <button>Login</button>
    </form>
  );
};

export default LoginForm;

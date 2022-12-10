import React, { useContext } from "react";
import { AuthContext } from "../context/auth-context";
import "../App.css";

const LoginForm = function () {
  const auth = useContext(AuthContext);

  const loginHandler = async (event) => {
    event.preventDefault();
    let resData;
    const data = new FormData(event.currentTarget);
    const requestOption = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    };
    fetch("http://localhost:5000/user/login", requestOption)
      .then((res) => (res.ok ? res.json() : { resData: "" }))
      .then((data) => {
        console.log(data);
        if (data.message == "login") auth.login();
      });
  };

  return (
    <>
      {!auth.isLoggedIn && (
        <form onSubmit={loginHandler}>
          <div className="app_login">
            <h2 className="app_loginTitle"> Login</h2>

            <input
              className="app_email"
              placeholder="email"
              type="email"
              id="email"
              name="email"
            ></input>
            <input
              className="app_pass"
              type="password"
              placeholder="password"
              id="password"
              name="password"
            ></input>
            <button className="app_loginBtn" type="submit">
              Login
            </button>
          </div>
        </form>
      )}
    </>
  );
};
export default LoginForm;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";

const SignUp = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: ""
  });

  const history = useHistory();

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const register = event => {
    event.preventDefault();

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/https://wunderlistbuild.herokuapp.com/api/auth/register",
        user,
        {
          headers: { "Access-Control-Allow-Origin": "*" }
        }
      )

      .then(res => {
        console.log(res);
        history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="login-form">
      {console.log(user)}
      <form onSubmit={register}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            id="name"
            type="text"
            name="username"
            placeholder="username"
            onChange={handleChange}
            value={user.username}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            value={user.password}
          />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="email"
            onChange={handleChange}
            value={user.email}
          />
        </div>
        <button className="login button" type="login">
          Sign Up
        </button>
        <h3> Already a member?</h3>
        <Link to="/">Login</Link>
      </form>
    </div>
  );
};

export default SignUp;

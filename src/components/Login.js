import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({});
  const history = useHistory();

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };
  
  const login = () => {

    AxiosWithAuth()
      .post("/api/auth/login", user)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        history.push("/todo");
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleSubmit = event => {
    event.preventDefault();
    login();
  };

  return (

    <div className="login-form">
      {console.log("!",user)}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <input
            id="username"
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
        <button className="login button" type="login">
          Login
        </button>
        <div>
          New User? sign up here
          <Link to="/signup"> Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;

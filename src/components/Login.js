import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = ({login}) => {
  const [user, setUser] = useState({
    
  });

  const handleChange = event => {
    setUser({
      ...user,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      login(user)
    };

    return (
        <div className="login-form">
        {console.log(user)}
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
          <Link to="/signUp"> Sign Up</Link>
        </div>
      </form>
    </div>
  );
};
export default Login;

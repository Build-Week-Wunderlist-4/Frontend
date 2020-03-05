import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosWithAuth from "../utils/AxiosWithAuth";

import { useHistory } from 'react-router-dom';

import styled from "styled-components";

// styles
const Form = styled.form`
  margin: 10% 70% 40% 2% ;
  background:#A0A2A3;
  border-radius: 10px;
  padding: 5%;
  font-family: 'Spartan', sans-serif;

  `;

const NewUser = styled.div`
  margin-top: 50%;`


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
    <>
     
      <div className="login-form">
        {console.log(user)}
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Username</label>
           
            <input
              id="username"
              type="text"
              name="username"
              placeholder="Username"
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
              placeholder="Password"
              onChange={handleChange}
              value={user.password}
            />
          </div>
          <button className="login button" type="login">
            Login
        </button>

          <NewUser>
            <h3>Dont have an account?</h3>
            <Link to="/signUp"> <button>Sign Up Here</button></Link>
          </NewUser>
        </Form>
      </div>
    </>
  );
};
export default Login;

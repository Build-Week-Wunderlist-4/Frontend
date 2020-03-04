import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import styled from "styled-components";
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
    axios
      .post("https://wunderlistbuild.herokuapp.com/api/auth/login", user)
      .then(res => {
        console.log('thi', res.data);
        localStorage.setItem('token', res.data.token);
        // setUser(user.username);
        history.push('/todo')
      })
      .catch(error => {
        console.error(error);
      });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(user)
  };


  // styles
  const Form = styled.form`
    margin: 10% 65% 40% 2% ;
    background:#A0A2A3;
    border-radius: 10px;
    padding: 5%;
    font-family: 'Spartan', sans-serif;

    `;

  const NewUser = styled.div`
    margin-top: 40%;
    `
  return (
    <div className="login-form">
      {console.log(user)}
      <Form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Username</label>
          <br></br>
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
  );
};
export default Login;

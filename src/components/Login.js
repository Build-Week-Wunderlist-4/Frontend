import React, { useState } from "react";
import { Link } from "react-router-dom";
import AxiosWithAuth from "../utils/AxiosWithAuth";
import { useHistory } from 'react-router-dom';

import styled from "styled-components";
import Header from "./Header"
import BackgroundImage from "./pins.jpg"
//background Styles
const LoginBackground = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed; 
  background-size: cover;    
  height:100vh;
  overflow-y:hidden;
`
// styles
const Form = styled.form`
font-weight:bold;
font-size: 1.5em;
color:rgb(255,255,255,.5);
  margin: 10% 70% 40% 2% ;
  background-color: rgb(211,0,0,.4);
    box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 5%;
  font-family: 'Spartan', sans-serif;
  `
const Button = styled.button `
font-size:1rem;
font-weight:bold;
padding: 2% 10%;
background-color: rgb(255,255,255,.5);
    background-repeat:no-repeat;
    border: 1px solid black;
    border-radius: 15px;
    cursor:pointer;
    overflow: hidden; 
`
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
     <LoginBackground>
     <Header/>
        <div className="login-form">
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
          <Button className="login button" type="login">
            Login
        </Button>

          <NewUser>
            <h3>Dont have an account?</h3>
            <Link to="/signUp"> <Button>Sign Up Here</Button></Link>
          </NewUser>
        </Form>
      </div>
     </LoginBackground>
     
    </>
  );
};
export default Login;

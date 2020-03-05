import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';
import Header from "./Header"
import BackgroundImage from "./pins.jpg"
//background Styles
const LoginBackground = styled.div`
  background: url(${BackgroundImage}) no-repeat center center fixed; 
  background-size: cover;    
  height:100%;
  overflow-y:hidden;
`

//styles
const Form = styled.form`
  margin: 10% 70% 40% 2% ;
  background-color: rgb(211,211,211,.4);
    box-shadow: 2px 2px 10px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 5%;
  font-family: 'Spartan', sans-serif;
  `

const Member = styled.div`
margin-top: 40%;
`
const Button = styled.button `
text-decoration:none;
`

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
        <LoginBackground>
             <Header/>
        <div className="login-form">
            {console.log(user)}
            <Form onSubmit={register}>
                <div>
                    <label htmlFor="username">Username</label>
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
                <div>
                    <label htmlFor="email">Email</label>
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
                    Sign Up</button>
                <Member>
                    <h3> Already a member?</h3>
                    <Link to="/"><Button>Login</Button></Link>
                </Member>
            </Form>
        </div>
        </LoginBackground>
       
    );
};


export default SignUp;

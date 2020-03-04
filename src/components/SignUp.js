import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

const SignUp = () => {
    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const handleChange = event => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const register = event => {
        event.preventDefault();
        axios.post()
            .then(response => { })
            .catch(error => { console.log(error); })
    }

    // styles
    const Form = styled.form`
    margin: 10% 65% 40% 2% ;
    background: #7A7F80;
    border-radius: 10px;
    padding: 5%;
    font-family: 'Spartan', sans-serif;
    color:white;
    `;

    const Member = styled.div`
    margin-top: 40%;
    `

    return (
        <div className='login-form'>
            <Form onSubmit={register}>

                <div>
                    <label htmlFor='name'>Username</label>
                    <input id='name' type="text" name='username' placeholder='username' onChange={handleChange} value={user.username} />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input id="password" type="password" name="password" placeholder="password" onChange={handleChange} value={user.password} />
                </div>
                <button className='login button' type='login'>Sign Up</button>
                <Member><h3> Already a member?</h3>
                    <Link to="/"><button>Login</button></Link></Member>

            </Form>
        </div>
    )
}

export default SignUp;
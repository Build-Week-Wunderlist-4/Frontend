import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from "styled-components"

const Login= () => {
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
    
    const login = event => {
        event.preventDefault();
        axios.post()
        .then(response => { })
        .catch(error => { console.log(error); })
    }
    
    return (
        <div className='login-form'>
        <form onSubmit={login}>

            <div>
                <label htmlFor='name'>Username</label>
                <input id='name' type="text" name='username' placeholder='username' onChange={handleChange} value={user.username} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="password" onChange={handleChange} value={user.password} />
            </div>
            <button className='login button' type='login'>Login</button>
            <div>New User? sign up here
                <Link to="/signUp"> Sign Up</Link>
            </div>
        </form>
    </div>
)
}
export default Login;
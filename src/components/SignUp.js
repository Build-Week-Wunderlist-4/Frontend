import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";

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
    
    return (
        <div className='login-form'>
        <form onSubmit={register}>

            <div>
                <label htmlFor='name'>Username</label>
                <input id='name' type="text" name='username' placeholder='username' onChange={handleChange} value={user.username} />
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" name="password" placeholder="password" onChange={handleChange} value={user.password} />
            </div>
            <button className='login button' type='login'>Sign Up</button>
            <h3> Already a member?</h3>
           <Link to="/">Login</Link>
        </form>
    </div>
)
}

export default SignUp;
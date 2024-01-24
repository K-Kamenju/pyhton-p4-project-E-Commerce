// Login.js

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import '../Pages/css/Login.css';

function Login({ onLogin }) {

    const handleLoginClick = () => {
        onLogin();
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Login</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your Name' />
                    <input type="email" placeholder='Email Address' />
                    <input type="password" placeholder='Password' />
                </div>
                <button onClick={handleLoginClick}>Continue</button>
                <p className="loginsignup-login">Don't have an account? 
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    Sign Up here
                </Link></p>
                <div className="loginsignup-agree">
                    <input type="checkbox" name='' id='' />
                    <p>By continuing, I agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default Login;

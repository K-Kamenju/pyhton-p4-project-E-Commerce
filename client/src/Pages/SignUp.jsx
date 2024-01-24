// Signup.js

import React from 'react';
import '../Pages/css/Login.css';

function Signup({ onSignup }) {

    const handleSignupClick = () => {
        onSignup();
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                <div className="loginsignup-fields">
                    {/* Add necessary signup input fields */}
                    <input type="text" placeholder='Your Name' />
                    <input type="email" placeholder='Email Address' />
                    <input type="password" placeholder='Password' />
                </div>
                <button onClick={handleSignupClick}>Sign Up</button>
                
            </div>
        </div>
    )
}

export default Signup;
